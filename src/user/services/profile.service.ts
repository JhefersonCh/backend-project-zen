import { ProjectsService } from './../../projects/services/projects.service';
import { Injectable } from '@nestjs/common';
import { TasksService } from 'src/projects/services/tasks.service';
import { StatisticsDto } from '../dtos/profile.dto';

@Injectable()
export class ProfileService {
  constructor(
    private readonly tasksService: TasksService,
    private readonly projectsService: ProjectsService,
  ) {}

  async getStatistics(userId: string): Promise<StatisticsDto> {
    const tasks = await this.tasksService.getTasksCountForUser(userId);

    const projects = await this.projectsService.getProjectsCountForUser(userId);
    return {
      tasks,
      projects,
    };
  }
}
