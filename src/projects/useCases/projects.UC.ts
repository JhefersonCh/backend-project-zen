import { Injectable } from '@nestjs/common';
import { ProjectsService } from '../services/projects.service';

@Injectable()
export class ProjectsUseCase {
  constructor(private readonly _projectsService: ProjectsService) {}

  async getRelatedData() {
    return this._projectsService.getRelatedData();
  }
}
