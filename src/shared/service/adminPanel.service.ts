import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { In } from 'typeorm';
import { UserRepository } from '../repositories/user.repository';
import { RepositoriesService } from './repositories.service';
import {
  BaseAdminPanelElementDto,
  UpdateAdminPanelElementDto,
} from '../dtos/adminPanel.dto';

@Injectable()
export class AdminPanelService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly repositoriesService: RepositoriesService,
  ) {}

  private async validateAdmin(userId: string): Promise<void> {
    const userIsAdmin = await this.userRepo.findOne({
      where: {
        id: userId,
        role: {
          code: In(['admin', 'superadmin']),
        },
      },
    });

    if (!userIsAdmin) {
      throw new HttpException(
        'No estás autorizado para obtener esta información.',
        HttpStatus.CONFLICT,
      );
    }
  }

  async getAdminPanelInfo(userId: string) {
    await this.validateAdmin(userId);

    const [identificationTypes, categories, tags, projectRoles, stauses] =
      await Promise.all([
        this.repositoriesService.repositories.identificationType.find(),
        this.repositoriesService.repositories.category.find(),
        this.repositoriesService.repositories.tag.find(),
        this.repositoriesService.repositories.projectRole.find(),
        this.repositoriesService.repositories.status.find(),
      ]);

    return {
      identificationTypes,
      categories,
      tags,
      projectRoles,
      stauses,
    };
  }

  async createElement(
    userId: string,
    element: string,
    body: BaseAdminPanelElementDto,
  ): Promise<string> {
    await this.validateAdmin(userId);

    const repository =
      this.repositoriesService.repositories[element.toString()];

    return this.repositoriesService.createEntity(repository, body);
  }

  async updateElement(
    userId: string,
    element: string,
    body: UpdateAdminPanelElementDto,
  ) {
    await this.validateAdmin(userId);
    const repository =
      this.repositoriesService.repositories[element.toString()];

    return this.repositoriesService.updateEntity(repository, body.id, body);
  }

  async getElementById(userId: string, element: string, id: number) {
    await this.validateAdmin(userId);
    const repository =
      this.repositoriesService.repositories[element.toString()];

    const entity = this.repositoriesService.getOneEntityById<{ id: any }>(
      repository,
      id,
    );
    return entity;
  }

  async deleteElement(userId: string, element: string, id: number) {
    await this.validateAdmin(userId);
    const repository =
      this.repositoriesService.repositories[element.toString()];
    await this.repositoriesService.deleteEntityById(repository, id);
  }
}
