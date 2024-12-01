import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReportsUseCase } from '../useCases/reports.UC';
import { AuthGuard } from '@nestjs/passport';
import {
  DateParamsForReportDto,
  MembersByProjectReportDto,
} from '../dtos/reports.dto';

@Controller('reports')
@ApiTags('reports')
export class ReportsController {
  constructor(private readonly reportsUseCase: ReportsUseCase) {}

  @Get('/projects/time')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async getProjectsReports(
    @Req() req,
    @Query() params: DateParamsForReportDto,
  ) {
    return await this.reportsUseCase.getProjectsByTime(req.user.id, params);
  }

  @Get('projects/vs')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async getProjectsVs(@Req() req) {
    return await this.reportsUseCase.getProjectsVs(req.user.id);
  }

  @Get('/tasks/time')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async getTasksReports(@Req() req, @Query() params: DateParamsForReportDto) {
    return await this.reportsUseCase.getTasksByTime(req.user.id, params);
  }

  @Get('/tasks/by-status')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async getTasksByStatus(@Req() req) {
    return await this.reportsUseCase.getTasksByStatus(req.user.id);
  }

  @Get('/members/project')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async getMembersReports(@Req() req) {
    return await this.reportsUseCase.getMembersByProjects(req.user.id);
  }

  @Get('/members/progress')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async getMembersPercentAdvance(
    @Query() params: MembersByProjectReportDto,
    @Req() req,
  ) {
    return await this.reportsUseCase.getMembersProgressByProject(
      req.user.id,
      params,
    );
  }
}
