import { Injectable } from '@nestjs/common';
import { ReportsService } from '../services/reports.service';
import { ProjectReportModel } from '../models/projectReports.model';
import { MembersByProjectReportDto } from '../dtos/reports.dto';

@Injectable()
export class ReportsUseCase {
  constructor(private readonly reportsService: ReportsService) {}

  async getProjectsByTime(userId: string, params: ProjectReportModel) {
    const time = await this.reportsService.getProjectsReports(
      'projects_by_time',
      userId,
      params,
    );

    return {
      time,
    };
  }
  async getProjectsVs(userId: string) {
    const vs = await this.reportsService.getProjectsReports(
      'completed_vs_in_progress',
      userId,
    );
    return { vs };
  }

  async getTasksByTime(userId: string, params: ProjectReportModel) {
    const time = await this.reportsService.getTasksReports(
      'tasks_by_time',
      userId,
      params,
    );
    return {
      time,
    };
  }

  async getTasksByStatus(userId: string) {
    const status = await this.reportsService.getTasksReports(
      'tasks_by_status',
      userId,
    );
    return { status };
  }

  async getMembersByProjects(userId: string) {
    const byProject = await this.reportsService.getMembersReports(
      'members_by_project',
      userId,
    );
    return {
      byProject,
    };
  }

  async getMembersProgressByProject(
    userId: string,
    params: MembersByProjectReportDto,
  ) {
    const percentAdvance = await this.reportsService.getMembersReports(
      'members_percent_advance',
      userId,
      params,
    );
    return {
      percentAdvance,
    };
  }
}
