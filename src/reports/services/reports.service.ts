import { Injectable } from '@nestjs/common';
import { CrudProjectsService } from 'src/projects/services/crudProjects.service';
import { ProjectsService } from './../../projects/services/projects.service';
import { ProjectReportModel } from '../models/projectReports.model';
import { FormatReportsService } from './formatReports.service';

@Injectable()
export class ReportsService {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly crudProjectsService: CrudProjectsService,
    private readonly formatReportsService: FormatReportsService,
  ) {}

  async getProjectsReports(
    reportType: string,
    userId: string,
    params: ProjectReportModel,
  ) {
    switch (reportType) {
      case 'projects_by_time':
        return this.getProjectsByTime(userId, params);
      case 'projects_by_category':
        return;
      default:
        return this.getProjectsByTime(userId, params);
    }
  }

  async getProjectsByTime(userId: string, params: ProjectReportModel) {
    return this.formatReportsService.formatProjectsByTime(
      await this.projectsService.getProjectsByUserAndTime(userId, params),
    );
  }
}
