import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from './../../shared/dtos/response.dto';
import { HttpStatus } from '@nestjs/common';

export interface StatisticsDto {
  tasks: {
    total: number;
    completed: number;
    inProgress: number;
    notStarted: number;
  };
  projects: {
    total: number;
    leader: number;
  };
}

export class StatisticsResponseDto implements BaseResponseDto {
  @ApiProperty({
    type: Number,
    example: HttpStatus.OK,
  })
  statusCode: number;
  @ApiProperty({
    type: Object,
    example: {
      totalProjects: 1,
      totalTasks: 1,
      totalLeaderProjects: 1,
      tasksCompleted: 1,
    },
  })
  data: StatisticsDto;
}
