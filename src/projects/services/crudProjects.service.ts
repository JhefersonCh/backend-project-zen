/* eslint-disable @typescript-eslint/no-unused-expressions */
import { ResponsePaginationDto } from './../../shared/dtos/pagination.dto';
import { PageMetaDto } from './../../shared/dtos/pageMeta.dto';
import { MembersRepository } from './../../shared/repositories/members.repository';
import { NOT_FOUND_RESPONSE } from './../../shared/constants/response.constant';
import { Projects } from './../../shared/entities/projects.entity';
import { ProjectModel } from '../models/projects.model';
import { ProjectRepository } from './../../shared/repositories/project.repository';
import { ProjectCategoriesRepository } from './../../shared/repositories/projectCategories.repository';
import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { PaginatedListProjectsParamsDto } from '../dtos/projects.dto';
import { Between, Like } from 'typeorm';

@Injectable()
export class CrudProjectsService {
  constructor(
    private readonly _projectsRepo: ProjectRepository,
    private readonly _projectCategoriesRepo: ProjectCategoriesRepository,
    private readonly _membersRepo: MembersRepository,
    private readonly _tasksService: TasksService,
  ) {}

  async create(
    projectModel: ProjectModel,
    userId: string,
  ): Promise<{ rowId: string }> {
    try {
      const insertResult = await this._projectsRepo.insert(projectModel);
      const newProject = insertResult?.identifiers[0];

      if (!newProject) {
        throw new InternalServerErrorException('Failed to create project');
      }

      if (projectModel.categoryIds && projectModel.categoryIds.length > 0) {
        await Promise.all(
          projectModel.categoryIds.map((categoryId) =>
            this._projectCategoriesRepo.insert({
              projectId: newProject.id,
              categoryId,
            }),
          ),
        );
      }

      if (userId) {
        await this._membersRepo.insert({
          userId,
          projectRoleId: 1,
          projectId: newProject.id,
        });
      }

      return { rowId: newProject.id };
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_error) {
      throw new InternalServerErrorException(
        'Error creating project and associating categories',
      );
    }
  }

  async findAll(): Promise<Projects[]> {
    const query = this._projectsRepo
      .createQueryBuilder('projects')
      .innerJoinAndSelect('projects.projectCategories', 'pc')
      .innerJoinAndSelect('pc.category', 'cat');

    const results = await query.getMany();
    return results;
  }

  async findAllByUserId(userId: string): Promise<Projects[]> {
    const query = this._projectsRepo
      .createQueryBuilder('projects')
      .innerJoinAndSelect('projects.projectCategories', 'pc')
      .innerJoinAndSelect('pc.category', 'cat')
      .innerJoinAndSelect('projects.members', 'memb')
      .innerJoinAndSelect('memb.user', 'user')
      .innerJoinAndSelect('memb.projectRole', 'projectRole')
      .where('memb.userId = :userId', { userId });

    return await query.getMany();
  }

  async findOneById(id: number, userId: string): Promise<Projects> {
    const userIsMember = await this._membersRepo.findOne({
      where: { userId, projectId: id },
    });

    if (!userIsMember) {
      throw new HttpException(
        'No haces parte de este proyecto.',
        HttpStatus.NOT_FOUND,
      );
    }
    const query = this._projectsRepo
      .createQueryBuilder('projects')
      .innerJoinAndSelect('projects.projectCategories', 'pc')
      .innerJoinAndSelect('pc.category', 'cat')
      .innerJoinAndSelect('projects.members', 'memb')
      .innerJoinAndSelect('memb.user', 'user')
      .innerJoinAndSelect('memb.projectRole', 'projectRole')
      .where('projects.id = :id', { id });

    const results = await query.getOne();
    return results;
  }
  async update(projectModel: ProjectModel): Promise<void> {
    const projectExists = await this._projectsRepo.findOne({
      where: {
        id: projectModel.id,
      },
    });
    if (!projectExists) {
      throw new NotFoundException(NOT_FOUND_RESPONSE);
    }
    const projectToUpdate: Partial<Projects> = {
      title: projectModel.title,
      description: projectModel.description,
      finishDate: projectModel.finishDate,
    };

    await this._projectsRepo.update(projectModel.id, projectToUpdate);

    if (projectModel.categoryIds) {
      await this._projectCategoriesRepo.delete({ projectId: projectModel.id });

      await Promise.all(
        projectModel.categoryIds.map((categoryId) => {
          return this._projectCategoriesRepo.insert({
            projectId: projectModel.id,
            categoryId,
          });
        }),
      );
    }
  }

  async delete(id: number, userId: string) {
    const projectExists = await this._projectsRepo.findOne({
      where: {
        id,
      },
    });
    if (!projectExists) {
      throw new NotFoundException(NOT_FOUND_RESPONSE);
    }
    const userLeader = await this._membersRepo.findOne({
      where: { userId, projectId: id },
    });

    if (!userLeader || userLeader.projectRoleId !== 1) {
      throw new HttpException(
        'No está autorizado para eliminar este proyecto.',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this._projectsRepo.softDelete(id);
    await this._projectCategoriesRepo.delete({ projectId: id });
    await this._membersRepo.delete({ projectId: id });
    await this._tasksService.deleteByParams({ projectId: id });
  }

  async paginatedList(params: PaginatedListProjectsParamsDto) {
    const skip = (params.page - 1) * params.perPage;
    const where = {};

    params.id && Object.assign(where, { id: params.id });
    params.userId &&
      Object.assign(where, {
        members: {
          userId: params.userId,
        },
      });
    params.title &&
      Object.assign(where, {
        title: Like(`%${params.title}%`),
      });
    params.description &&
      Object.assign(where, {
        description: Like(`%${params.description}%`),
      });

    params.createdAtInit &&
      params.createdAtEnd &&
      Object.assign(where, {
        createdAt: Between(
          new Date(params.createdAtInit),
          new Date(params.createdAtEnd),
        ),
      });

    const [entities, itemCount] = await this._projectsRepo.findAndCount({
      where,
      skip,
      take: params.perPage,
      order: { createdAt: params.order },
    });

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: params });

    return new ResponsePaginationDto(entities, pageMetaDto);
  }
}
