/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DeepPartial, FindOptionsWhere, Repository } from 'typeorm';
import { RolesRepository } from '../repositories/rol.repository';
import { IdentificationTypesRepository } from '../repositories/identificationType.repository';
import { CategoryRepository } from '../repositories/category.repository';
import { TagRepository } from '../repositories/tag.repository';
import { ProjectRolesRepository } from '../repositories/projectRol.repository';
import { PriorityRepository } from '../repositories/priority.repository';
import { StatusRepository } from '../repositories/status.repository';
import { NOT_FOUND_MESSAGE } from '../constants/messages.constant';

@Injectable()
export class RepositoriesService {
  public repositories: {
    roles: RolesRepository;
    identificationType: IdentificationTypesRepository;
    category: CategoryRepository;
    tag: TagRepository;
    projectRole: ProjectRolesRepository;
    priority: PriorityRepository;
    status: StatusRepository;
  };

  constructor(
    private readonly rolesRepo: RolesRepository,
    private readonly identificationTypesRepo: IdentificationTypesRepository,
    private readonly categoriesRepo: CategoryRepository,
    private readonly tagsRepo: TagRepository,
    private readonly projectRolesRepo: ProjectRolesRepository,
    private readonly prioritiesRepo: PriorityRepository,
    private readonly statusRepo: StatusRepository,
  ) {
    this.repositories = {
      roles: rolesRepo,
      identificationType: identificationTypesRepo,
      category: categoriesRepo,
      tag: tagsRepo,
      projectRole: projectRolesRepo,
      priority: prioritiesRepo,
      status: statusRepo,
    };
  }

  /**
   * Método para obtener todas las entidades del repositorio enviado por los parametros
   * @param repository
   * @returns
   */
  async getEntities<T>(repository: Repository<T>): Promise<T[]> {
    return await repository.find();
  }

  /**
   * Método generico para crear una entidad del repositorio enviado
   * @param repository
   * @param body
   * @returns
   */
  async createEntity<T>(
    repository: Repository<T>,
    body: DeepPartial<T>,
  ): Promise<string> {
    const row = (await repository?.save(body)) as T & { id: number };
    if (!row) {
      throw new HttpException(
        'Error al crear el registro',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return row.id.toString();
  }

  /**
   * Método generico para actualizar una entidad del repositorio enviado
   * @param repository
   * @param id
   * @param body
   * @returns
   */
  async updateEntity<T extends EntityWithId>(
    repository: Repository<T>,
    id: number,
    body: DeepPartial<T>,
  ): Promise<T> {
    const entityToUpdate = await repository.findOneBy({
      id,
    } as FindOptionsWhere<T>);

    if (!entityToUpdate) {
      throw new HttpException(NOT_FOUND_MESSAGE, HttpStatus.NOT_FOUND);
    }

    Object.assign(entityToUpdate, body);
    try {
      return await repository.save(entityToUpdate);
    } catch (_) {
      throw new HttpException(
        'Error al actualizar el registro.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  /**
   * Método para obtener un elemento por id de forma generica en el repositorio enviado.
   * @param repository
   * @param id
   * @returns
   */
  async getOneEntityById<T extends EntityWithId>(
    repository: Repository<T>,
    id: number,
  ): Promise<T> {
    const entity = await repository.findOneBy({ id } as FindOptionsWhere<T>);
    if (!entity) {
      throw new HttpException(NOT_FOUND_MESSAGE, HttpStatus.NOT_FOUND);
    }
    return entity;
  }

  /**
   * Método genérico para eliminar un elemento por id del repositorio enviado.
   * @param repository
   * @param id
   */
  async deleteEntityById<T extends EntityWithId>(
    repository: Repository<T>,
    id: number,
  ): Promise<void> {
    const entity = await repository.findOneBy({ id } as FindOptionsWhere<T>);
    if (!entity) {
      throw new HttpException(NOT_FOUND_MESSAGE, HttpStatus.NOT_FOUND);
    }
    try {
      await repository.delete(id);
    } catch (_) {
      throw new HttpException(
        'Error al eliminar el registro.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}

interface EntityWithId {
  id: number;
}
