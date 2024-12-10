import { ParamsPaginationDto } from './../../shared/dtos/pagination.dto';
import { Tasks } from './../../shared/entities/tasks.entity';
import { Tags } from './../../shared/entities/tags.entity';
import { Status } from './../../shared/entities/status.entity';
import { Priorities } from './../../shared/entities/priorities.entity';
import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export class TasksRelatedDataResponse {
  @ApiProperty({
    type: Number,
    example: HttpStatus.OK,
  })
  statusCode: number;
  @ApiProperty({
    type: Object,
    example: {
      priorities: [
        {
          id: 1,
          title: 'Urgente',
          createdAt: '2024-10-25T04:27:38.885Z',
          updatedAt: '2024-10-25T04:27:38.885Z',
          deletedAt: null,
        },
        {
          id: 2,
          title: 'Alta',
          createdAt: '2024-10-25T04:27:50.064Z',
          updatedAt: '2024-10-25T04:27:50.064Z',
          deletedAt: null,
        },
        {
          id: 3,
          title: 'Media',
          createdAt: '2024-10-25T04:28:05.644Z',
          updatedAt: '2024-10-25T04:28:05.644Z',
          deletedAt: null,
        },
        {
          id: 4,
          title: 'Baja',
          createdAt: '2024-10-25T04:28:15.207Z',
          updatedAt: '2024-10-25T04:28:15.207Z',
          deletedAt: null,
        },
      ],
      statuses: [
        {
          id: 1,
          title: 'No iniciada',
          createdAt: '2024-10-25T04:29:32.556Z',
          updatedAt: '2024-10-25T04:29:32.556Z',
          deletedAt: null,
        },
        {
          id: 2,
          title: 'En progreso',
          createdAt: '2024-10-25T04:29:44.895Z',
          updatedAt: '2024-10-25T04:29:44.895Z',
          deletedAt: null,
        },
        {
          id: 3,
          title: 'Terminada',
          createdAt: '2024-10-25T04:30:04.302Z',
          updatedAt: '2024-10-25T04:30:04.302Z',
          deletedAt: null,
        },
        {
          id: 4,
          title: 'Revisada',
          createdAt: '2024-10-25T04:30:11.296Z',
          updatedAt: '2024-10-25T04:30:11.296Z',
          deletedAt: null,
        },
      ],
      tags: [
        {
          id: 2,
          title: 'Investigación',
          createdAt: '2024-10-25T05:20:43.459Z',
          updatedAt: '2024-10-25T05:20:43.459Z',
          deletedAt: null,
        },
        {
          id: 1,
          title: 'Académico\n',
          createdAt: '2024-10-25T05:20:33.661Z',
          updatedAt: '2024-10-25T05:20:33.661Z',
          deletedAt: null,
        },
        {
          id: 3,
          title: 'Trabajo',
          createdAt: '2024-10-25T05:20:56.461Z',
          updatedAt: '2024-10-25T05:20:56.461Z',
          deletedAt: null,
        },
        {
          id: 4,
          title: 'Urgente',
          createdAt: '2024-10-25T05:22:14.300Z',
          updatedAt: '2024-10-25T05:22:14.300Z',
          deletedAt: null,
        },
        {
          id: 5,
          title: 'Desarrollo',
          createdAt: '2024-10-25T05:22:22.128Z',
          updatedAt: '2024-10-25T05:22:22.128Z',
          deletedAt: null,
        },
        {
          id: 6,
          title: 'Revisión',
          createdAt: '2024-10-25T05:22:29.414Z',
          updatedAt: '2024-10-25T05:22:29.414Z',
          deletedAt: null,
        },
        {
          id: 7,
          title: 'Personal',
          createdAt: '2024-10-25T05:22:53.836Z',
          updatedAt: '2024-10-25T05:22:53.836Z',
          deletedAt: null,
        },
        {
          id: 8,
          title: 'Colaborativo',
          createdAt: '2024-10-25T05:23:00.268Z',
          updatedAt: '2024-10-25T05:23:00.268Z',
          deletedAt: null,
        },
        {
          id: 9,
          title: 'Importante',
          createdAt: '2024-10-25T05:23:11.339Z',
          updatedAt: '2024-10-25T05:23:11.339Z',
          deletedAt: null,
        },
        {
          id: 10,
          title: 'Planificación',
          createdAt: '2024-10-25T05:23:28.607Z',
          updatedAt: '2024-10-25T05:23:28.607Z',
          deletedAt: null,
        },
        {
          id: 11,
          title: 'Reporte',
          createdAt: '2024-10-25T05:23:34.847Z',
          updatedAt: '2024-10-25T05:23:34.847Z',
          deletedAt: null,
        },
        {
          id: 12,
          title: 'Análisis',
          createdAt: '2024-10-25T05:23:42.311Z',
          updatedAt: '2024-10-25T05:23:42.311Z',
          deletedAt: null,
        },
        {
          id: 13,
          title: 'Feedback',
          createdAt: '2024-10-25T05:23:48.217Z',
          updatedAt: '2024-10-25T05:23:48.217Z',
          deletedAt: null,
        },
        {
          id: 14,
          title: 'Implementación',
          createdAt: '2024-10-25T05:23:54.241Z',
          updatedAt: '2024-10-25T05:23:54.241Z',
          deletedAt: null,
        },
      ],
    },
  })
  data: TasksRelatedDataDto;
}

export interface TasksRelatedDataDto {
  priorities: Priorities[];
  statuses: Status[];
  tags: Tags[];
}

export class BaseTaskDto {
  @ApiProperty({
    type: String,
    example: 'Task Title',
    required: true,
    maxLength: 200,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;
  @ApiProperty({
    type: String,
    example: 'Task Description',
    required: true,
    maxLength: 2000,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  description: string;

  @ApiProperty({
    type: Number,
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  priorityId: number;

  @ApiProperty({
    type: Number,
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  statusId: number;
}

export class CreateTaskDto extends BaseTaskDto {
  @ApiProperty({
    type: Number,
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  projectId: number;

  @ApiProperty({
    type: Array,
    example: [1, 2, 3],
    required: true,
  })
  @IsArray()
  @IsNotEmpty()
  tagIds: number[];

  @ApiProperty({
    type: Date,
    example: '2022-01-01T12:00:00.000Z',
    format: 'date-time',
    required: true,
  })
  @IsNotEmpty()
  deadline: Date;

  @ApiProperty({
    type: Number,
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  memberId: number;
}

export class UpdateTaskDto extends BaseTaskDto {
  @ApiProperty({
    type: Number,
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({
    type: Array,
    example: [4, 5, 6],
    required: false,
  })
  @IsOptional()
  @IsArray()
  tagIds?: number[];

  @ApiProperty({
    type: Number,
    example: 1,
    required: false,
  })
  @IsNumber()
  @IsOptional()
  memberId?: number;

  @ApiProperty({
    type: Date,
    example: '2022-01-01T12:00:00.000Z',
    format: 'date-time',
    required: false,
  })
  @IsOptional()
  deadline?: Date;
}

export class GetTaskByIdResponse {
  @ApiProperty({
    type: Number,
    example: HttpStatus.OK,
  })
  statusCode: number;
  @ApiProperty({
    type: Object,
  })
  data: Tasks;
}
export class GetManyTasksResponse {
  @ApiProperty({
    type: Number,
    example: HttpStatus.OK,
  })
  statusCode: number;
  @ApiProperty({
    type: Array,
  })
  data: Tasks[];
}

export class GetAllByProjectIdAndMemberIdBodyDto {
  @ApiProperty({
    type: String,
    example: 1,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  projectId: string;
  @ApiProperty({
    type: String,
    example: 1,
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  memberId: string;
}

export interface UpdateManyStatusesBodyDto {
  statusId: number;
  id: number;
}

export class UpdateManyStatusesDto {
  @ApiProperty({
    type: Array,
    example: [
      { statusId: 1, id: 1 },
      { statusId: 2, id: 2 },
    ],
    required: true,
  })
  @IsArray()
  @IsNotEmpty()
  tasks: UpdateManyStatusesBodyDto[];
}

export class PaginatedListTasksParamsDto extends ParamsPaginationDto {
  @ApiProperty({
    type: String,
    required: false,
    example: 1,
  })
  @IsString()
  @IsOptional()
  id?: number;

  @ApiProperty({
    type: String,
    required: false,
    example: 1,
  })
  @IsString()
  @IsOptional()
  projectId?: number;

  @ApiProperty({
    type: String,
    required: false,
    example: 'Task Title',
  })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 1,
  })
  @IsString()
  @IsOptional()
  priorityId?: number;

  @ApiProperty({
    type: String,
    required: false,
    example: 1,
  })
  @IsString()
  @IsOptional()
  statusId?: number;

  @ApiProperty({
    type: String,
    required: false,
    example: 'Task description',
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({
    type: String,
    example: '2022-01-01T12:00:00.000Z',
    format: 'date-time',
    required: false,
  })
  @IsOptional()
  @IsString()
  dateInit?: Date;

  @ApiProperty({
    type: String,
    example: '2022-01-01T12:00:00.000Z',
    format: 'date-time',
    required: false,
  })
  @IsOptional()
  @IsString()
  dateEnd?: Date;

  @ApiProperty({ type: String, example: 'uuid', required: false })
  @IsString()
  @IsOptional()
  userId?: string;
}
