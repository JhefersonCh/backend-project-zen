import { ResponsePaginationDto } from './../../shared/dtos/pagination.dto';
import { PageMetaDto } from './../../shared/dtos/pageMeta.dto';
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
  PaginatedListTasksParamsDto,
  UpdateManyStatusesBodyDto,
  UpdateTaskDto,
} from '../dtos/tasks.dto';
import { Between, Connection, Like } from 'typeorm';
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

  async findAllByUserId(userId: string): Promise<Tasks[]> {
    const queryBuilder = this.tasksRepo.createQueryBuilder('task');
    queryBuilder
      .select([
        'task.id as id',
        'task.title as title',
        'task.description as description',
        'task.deadline as deadline',
        'task.createdAt as createdAt',
        'task.projectId as projectId',
      ])
      .leftJoin('task.priority', 'priority')
      .leftJoin('task.status', 'status')
      .leftJoin('task.member', 'member')
      .where('member.userId = :userId', { userId });

    return await queryBuilder.getRawMany();
  }

  async deleteByParams(params: TasksWhereModel): Promise<void> {
    if (params.id) {
      const taskExist = await this.tasksRepo.findOne({
        where: { id: params?.id },
      });
      if (!taskExist) {
        throw new HttpException(NOT_FOUND_RESPONSE, HttpStatus.NOT_FOUND);
      }
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

  async paginatedList(params: PaginatedListTasksParamsDto) {
    const queryBuilder = this.tasksRepo.createQueryBuilder('task');
    const skip = (params.page - 1) * params.perPage;
    queryBuilder.skip(skip).take(params.perPage);

    queryBuilder.orderBy('task.createdAt', params.order);

    if (params.id) {
      queryBuilder.andWhere('task.id = :id', { id: params.id });
    }
    if (params.userId) {
      queryBuilder.leftJoinAndSelect('task.member', 'member');
      queryBuilder.andWhere('member.userId = :userId', {
        userId: params.userId,
      });
    }
    if (params.projectId) {
      queryBuilder.andWhere('task.projectId = :projectId', {
        projectId: params.projectId,
      });
    }
    if (params.priorityId) {
      queryBuilder.andWhere('task.priorityId = :priorityId', {
        priorityId: params.priorityId,
      });
    }
    if (params.statusId) {
      queryBuilder.andWhere('task.statusId = :statusId', {
        statusId: params.statusId,
      });
    }
    if (params.title) {
      queryBuilder.andWhere('task.title LIKE :title', {
        title: `%${params.title}%`,
      });
    }
    if (params.description) {
      queryBuilder.andWhere('task.description LIKE :description', {
        description: `%${params.description}%`,
      });
    }
    if (params.dateInit && params.dateEnd) {
      queryBuilder.andWhere(
        'task.createdAt BETWEEN :createdAtInit AND :createdAtEnd',
        {
          createdAtInit: new Date(params.dateInit),
          createdAtEnd: new Date(params.dateEnd),
        },
      );
    }

    const [entities, itemCount] = await queryBuilder.getManyAndCount();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: params });
    return new ResponsePaginationDto(entities, pageMetaDto);
  }

  async getTasksCountForUser(userId: string): Promise<{
    total: number;
    completed: number;
    inProgress: number;
    notStarted: number;
  }> {
    try {
      const result = await this.tasksRepo
        .createQueryBuilder('task')
        .select([
          'COUNT(task.id) AS total',
          'SUM(CASE WHEN status.title = :completed THEN 1 ELSE 0 END) AS completed',
          'SUM(CASE WHEN status.title = :inProgress THEN 1 ELSE 0 END) AS inProgress',
          'SUM(CASE WHEN status.title = :notStarted THEN 1 ELSE 0 END) AS notStarted',
        ])
        .leftJoin('task.member', 'member')
        .leftJoin('task.status', 'status')
        .where('member.userId = :userId', { userId })
        .andWhere('task.deletedAt IS NULL')
        .setParameters({
          completed: 'Terminada',
          inProgress: 'En progreso',
          notStarted: 'No iniciada',
        })
        .getRawOne();

      return {
        total: Number(result.total) || 0,
        completed: Number(result.completed) || 0,
        inProgress: Number(result.inprogress) || 0,
        notStarted: Number(result.notstarted) || 0,
      };
    } catch (error) {
      console.error('Error al obtener el conteo de tareas:', error);
      throw new HttpException(
        'Error al obtener el conteo de tareas para el usuario.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTasksByTime(
    userId: string,
    params: { startDate: Date; endDate: Date },
  ) {
    const result = await this.tasksRepo
      .createQueryBuilder('task')
      .select("TO_CHAR(task.createdAt, 'YYYY-MM') AS monthYear")
      .addSelect('COUNT(*) AS count')
      .innerJoin('task.member', 'member')
      .where('member.userId = :userId', { userId })
      .andWhere('task.createdAt BETWEEN :startDate AND :endDate', {
        startDate: params.startDate,
        endDate: params.endDate,
      })
      .groupBy("TO_CHAR(task.createdAt, 'YYYY-MM')")
      .getRawMany();

    return result;
  }

  async getTasksByStatus(userId: string) {
    const result = await this.tasksRepo
      .createQueryBuilder('task')
      .select([
        "COUNT(CASE WHEN status.title = 'No iniciada' THEN 1 END) as notStarted",
        "COUNT(CASE WHEN status.title = 'En progreso' THEN 1 END) as inProgress",
        "COUNT(CASE WHEN status.title = 'Terminada' THEN 1 END) as completed",
        "COUNT(CASE WHEN status.title = 'Revisada' THEN 1 END) as reviewed",
      ])
      .innerJoin('task.member', 'member')
      .innerJoin('task.status', 'status')
      .where('member.userId = :userId', { userId })
      .getRawOne();

    return result;
  }

  async getProgressByProject(projectId: string) {
    const qb = await this.tasksRepo
      .createQueryBuilder('task')
      .select([
        'member.id AS memberId',
        'user.fullName AS memberName',
        'COUNT(task.id) AS totalTasks',
        "COUNT(CASE WHEN status.title IN ('Terminada', 'Revisada') THEN 1 END) AS completedTasks",
      ])
      .innerJoin('task.member', 'member')
      .innerJoin('task.status', 'status')
      .innerJoin('member.user', 'user')
      .where('member.projectId = :projectId', { projectId })
      .groupBy('member.id, user.fullName');

    const rawResult = await qb.getRawMany();

    const result = {
      members: rawResult.map((item) => ({
        memberName: item.membername,
        progress: `${item.completedtasks} / ${item.totaltasks}`,
      })),
    };

    return result;
  }
}
