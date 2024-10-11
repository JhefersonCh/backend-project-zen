import { Injectable } from '@nestjs/common';
import { CreateProjectDto, UpdateProjectDto } from '../dtos/projects.dto';
import { CrudProjectsService } from '../services/crudProjects.service';

@Injectable()
export class CrudProjectsUseCase {
  constructor(private readonly _crudProjectsService: CrudProjectsService) {}

  async create(body: CreateProjectDto, userId: string) {
    return await this._crudProjectsService.create(
      {
        categoryIds: body.categoryIds,
        title: body.title,
        description: body.description,
        finishDate: body.finishDate,
      },
      userId,
    );
  }

  async findAllProjects() {
    return await this._crudProjectsService.findAll();
  }

  async findAllByUserId(userId: string) {
    return await this._crudProjectsService.findAllByUserId(userId);
  }

  async findOneProjectById(id: number) {
    return await this._crudProjectsService.findOneById(id);
  }

  async update(body: UpdateProjectDto) {
    return await this._crudProjectsService.update({
      id: body.id,
      categoryIds: body.categoryIds,
      title: body.title,
      description: body.description,
      finishDate: body.finishDate,
    });
  }
}
