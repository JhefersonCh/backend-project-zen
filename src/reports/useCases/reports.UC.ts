import { Injectable } from '@nestjs/common';
import { ReportsService } from '../services/reports.service';
import { ProjectReportModel } from '../models/projectReports.model';

@Injectable()
export class ReportsUseCase {
  constructor(private readonly reportsService: ReportsService) {}

  async getProjectsByTime(userId: string, params: ProjectReportModel) {
    const [time] = await Promise.all([
      this.reportsService.getProjectsReports(
        'projects_by_time',
        userId,
        params,
      ),
    ]);

    return {
      time,
    };
  }
}
