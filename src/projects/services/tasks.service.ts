/* eslint-disable @typescript-eslint/no-unused-vars */
import { UpdateManyResults } from './../../shared/interfaces/results.interface';
import { ProjectRepository } from './../../shared/repositories/project.repository';
import { NOT_FOUND_RESPONSE } from './../../shared/constants/response.constant';
import { TaskTags } from './../../shared/entities/taskTags.entity';
import { Tasks } from './../../shared/entities/tasks.entity';
/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Tags } from './../../shared/entities/tags.entity';
import { TagRepository } from './../../shared/repositories/tag.repository';
import { TaskTagsRepository } from './../../shared/repositories/taskTags.repository';
import { TaskRepository } from './../../shared/repositories/task.repository';
import { StatusRepository } from './../../shared/repositories/status.repository';
import { PriorityRepository } from './../../shared/repositories/priority.repository';
import { Priorities } from './../../shared/entities/priorities.entity';
import { Status } from './../../shared/entities/status.entity';
import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import {
  CreateTaskDto,
  UpdateManyStatusesBodyDto,
  UpdateTaskDto,
} from '../dtos/tasks.dto';
import { Connection } from 'typeorm';
import { MembersService } from './members.service';
import { TasksFiltersModel, TasksWhereModel } from '../models/params.model';

@Injectable()
export class TasksService {
  constructor(
    private readonly prioritiesRepo: PriorityRepository,
    private readonly statusesRepo: StatusRepository,
    private readonly tasksRepo: TaskRepository,
    private readonly taskTagsRepo: TaskTagsRepository,
    private readonly tagRepo: TagRepository,
    private readonly connection: Connection,
    private readonly projectsRepo: ProjectRepository,
    private readonly membersService: MembersService,
  ) {}
  async getRelatedData(): Promise<{
    priorities: Priorities[];
    statuses: Status[];
    tags: Tags[];
  }> {
    const [priorities, statuses, tags] = await Promise.all([
      this.prioritiesRepo.find(),
      this.statusesRepo.find(),
      this.tagRepo.find(),
    ]);
    return { priorities, statuses, tags };
  }

  async create(body: CreateTaskDto): Promise<string> {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this.validateProjectAndMember(body.projectId, body.memberId);

      const task = {
        title: body.title,
        description: body.description,
        projectId: body.projectId,
        priorityId: body.priorityId,
        statusId: body.statusId,
        memberId: body.memberId,
        deadline: body.deadline,
      };

      const result = await queryRunner.manager.insert(Tasks, task);
      const rowId = result.identifiers[0]?.id;

      if (!rowId) {
        throw new ConflictException('Fallos al crear la tarea.');
      }

      const tags = body.tagIds;
      if (tags?.length) {
        await Promise.all(
          tags.map((tag) =>
            queryRunner.manager.insert(TaskTags, {
              taskId: rowId,
              tagId: tag,
            }),
          ),
        );
      }

      await queryRunner.commitTransaction();

      return rowId.toString();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async update(body: UpdateTaskDto): Promise<void> {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      const task = {
        title: body.title,
        description: body.description,
        deadline: body.deadline,
        priorityId: body.priorityId,
        statusId: body.statusId,
        memberId: body.memberId,
      };
      const taskExist = await this.tasksRepo.findOne({
        where: { id: body.id },
      });
      if (!taskExist) {
        throw new HttpException(NOT_FOUND_RESPONSE, HttpStatus.NOT_FOUND);
      }
      await queryRunner.manager.update(Tasks, body.id, task);

      const tags = body.tagIds || [];
      await this.taskTagsRepo.delete({ taskId: body.id });
      await Promise.all(
        tags.map((tag) =>
          queryRunner.manager.insert(TaskTags, {
            taskId: body.id,
            tagId: tag,
          }),
        ),
      );

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }

  async updateStatuses(
    tasks: UpdateManyStatusesBodyDto[],
  ): Promise<UpdateManyResults> {
    const result: UpdateManyResults = {
      failed: 0,
      success: 0,
    };

    await Promise.all(
      tasks.map(async (task) => {
        try {
          const existingTask = await this.tasksRepo.findOne({
            where: { id: task.id },
          });

          if (!existingTask) {
            throw new HttpException(NOT_FOUND_RESPONSE, HttpStatus.NOT_FOUND);
          }

          await this.tasksRepo.update(task.id, { statusId: task.statusId });
          result.success++;
        } catch (_) {
          result.failed++;
        }
      }),
    );

    return result;
  }

  private async validateProjectAndMember(projectId: number, memberId: number) {
    const project = await this.projectsRepo.findOne({
      where: { id: projectId },
    });

    if (!project) {
      throw new ConflictException('El proyecto no existe.');
    }

    const member = await this.membersService.findOneById(memberId);
    if (!member) {
      throw new ConflictException('El miembro no existe.');
    }
  }

  async findOneByParams(params: TasksFiltersModel): Promise<Tasks> {
    const task = await this.tasksRepo.findOne({
      where: { ...params.where },
    });
    if (!task) {
      throw new HttpException(NOT_FOUND_RESPONSE, HttpStatus.NOT_FOUND);
    }
    return task;
  }
  async findManyByParams(params: TasksFiltersModel): Promise<Tasks[]> {
    const queryBuilder = this.tasksRepo.createQueryBuilder('task');
    queryBuilder
      .leftJoinAndSelect('task.taskTags', 'taskTag')
      .leftJoinAndSelect('taskTag.tag', 'tag')
      .leftJoinAndSelect('task.priority', 'priority');

    if (params.where) {
      Object.entries(params.where).forEach(([key, value]) => {
        queryBuilder.andWhere(`task.${key} = :${key}`, { [key]: value });
      });
    }

    const tasks = await queryBuilder.getMany();
    return tasks;
  }

  async deleteByParams(params: TasksWhereModel): Promise<void> {
    if (!params.id) {
      throw new HttpException(
        'El ID de la tarea es obligatorio.',
        HttpStatus.BAD_REQUEST,
      );
    }
    const taskExist = await this.tasksRepo.findOne({
      where: { id: params?.id },
    });
    if (!taskExist) {
      throw new HttpException(NOT_FOUND_RESPONSE, HttpStatus.NOT_FOUND);
    }

    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await this.taskTagsRepo.delete({ taskId: params?.id });

      if (params?.memberId) {
        const deleteResult = await this.tasksRepo.delete({
          id: params?.id,
          memberId: params?.memberId,
        });

        if (deleteResult.affected === 0) {
          throw new HttpException(
            'No se pudo eliminar la tarea del miembro.',
            HttpStatus.BAD_REQUEST,
          );
        }
      } else {
        await this.tasksRepo.delete({ id: params?.id });
      }

      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
