import { TasksService } from './../../projects/services/tasks.service';
import { MembersService } from './../../projects/services/members.service';
import { HttpException, Injectable } from '@nestjs/common';
import { ProjectsService } from './../../projects/services/projects.service';
import { ProjectReportModel } from '../models/projectReports.model';
import { FormatReportsService } from './formatReports.service';
import { MembersByProjectReportDto } from '../dtos/reports.dto';

@Injectable()
export class ReportsService {
  constructor(
    private readonly projectsService: ProjectsService,
    private readonly formatReportsService: FormatReportsService,
    private readonly tasksService: TasksService,
    private readonly membersService: MembersService,
  ) {}

  async getProjectsReports(
    reportType: string,
    userId: string,
    params?: ProjectReportModel,
  ) {
    switch (reportType) {
      case 'projects_by_time':
        return await this.getProjectsByTime(userId, params);
      case 'completed_vs_in_progress':
        return await this.getCompletedVsInProgress(userId);
      default:
        return this.getProjectsByTime(userId, params);
    }
  }

  async getTasksReports(
    reportType: string,
    userId: string,
    params?: ProjectReportModel,
  ) {
    switch (reportType) {
      case 'tasks_by_time':
        return await this.getTasksByTime(userId, params);
      case 'tasks_by_status':
        return await this.getTasksByStatus(userId);
      default:
        return this.getTasksByTime(userId, params);
    }
  }

  async getMembersReports(
    reportType: string,
    userId?: string,
    params?: MembersByProjectReportDto,
  ) {
    switch (reportType) {
      case 'members_by_project':
        return await this.getMembersByProjects(userId);
      case 'members_percent_advance':
        return await this.getMembersProgressByProject(userId, params);
      default:
        return this.getMembersByProjects(userId);
    }
  }

  async getMembersByProjects(userId: string) {
    return this.formatReportsService.formatReportsByMembersByProject(
      await this.membersService.getMembersByProjects(userId),
    );
  }

  async getMembersProgressByProject(
    userId: string,
    params: MembersByProjectReportDto,
  ) {
    const isLeader = await this.projectsService.verifyIfUserIsProjectLeader(
      userId,
      params.projectId,
    );
    if (!isLeader)
      throw new HttpException('No tiene permisos para ver este reporte', 403);
    return this.formatReportsService.formatReportsByMembersProgress(
      (await this.tasksService.getProgressByProject(params.projectId)).members,
    );
  }

  async getTasksByTime(userId: string, params: ProjectReportModel) {
    return this.formatReportsService.formatReportsByTime(
      await this.tasksService.getTasksByTime(userId, params),
      'tasks',
    );
  }

  async getTasksByStatus(userId: string) {
    return this.formatReportsService.formatReportsByStatus(
      await this.tasksService.getTasksByStatus(userId),
    );
  }

  async getProjectsByTime(userId: string, params: ProjectReportModel) {
    return this.formatReportsService.formatReportsByTime(
      await this.projectsService.getProjectsByUserAndTime(userId, params),
      'projects',
    );
  }

  async getCompletedVsInProgress(userId: string) {
    return this.formatReportsService.formatCompletedVsInProgress(
      await this.projectsService.getCompletedVsInProgress(userId),
    );
  }
}
