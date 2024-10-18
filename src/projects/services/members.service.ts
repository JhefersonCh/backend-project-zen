import { ProjectRolesRepository } from './../../shared/repositories/projecRoles.repository';
import { ProjectRoles } from './../../shared/entities/projectRoles.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MembersService {
  constructor(private readonly _projectRolesRepo: ProjectRolesRepository) {}

  async getRelatedData(): Promise<{ projectRoles: ProjectRoles[] }> {
    const projectRoles = await this._projectRolesRepo.find();
    return { projectRoles };
  }
}
