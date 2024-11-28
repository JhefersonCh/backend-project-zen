import { Controller, Get, Query, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ReportsUseCase } from '../useCases/reports.UC';
import { AuthGuard } from '@nestjs/passport';
import { ProjectReportDto } from '../dtos/reports.dto';

@Controller('reports')
@ApiTags('reports')
export class ReportsController {
  constructor(private readonly reportsUseCase: ReportsUseCase) {}

  @Get('/projects-time')
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async getProjectsReports(@Req() req, @Query() params: ProjectReportDto) {
    return await this.reportsUseCase.getProjectsByTime(req.user.id, params);
  }
}
