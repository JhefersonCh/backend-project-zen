import { Injectable } from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';
import { MemberToProjectDto } from '../dtos/projects.dto';

@Injectable()
export class ProjectsUseCase {
  constructor(private readonly _projectsService: ProjectsService) {}

  async getRelatedData() {
    return this._projectsService.getRelatedData();
  }

  async addMemberFromProject(body: MemberToProjectDto, userId: string) {
    return await this._projectsService.addMemberToProject(body, userId);
  }

  async removeMemberFromProject(
    body: Partial<MemberToProjectDto>,
    userId: string,
  ) {
    return await this._projectsService.removeMemberFromProject(body, userId);
  }
}
