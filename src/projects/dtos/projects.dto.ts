import { HttpStatus } from '@nestjs/common';
import { BaseResponseDto } from './../../shared/dtos/response.dto';
import { Categories } from './../../shared/entities/categories.entity';
import { Projects } from './../../shared/entities/projects.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import {
  GET_ALL_PROJECTS_RESPONSE_EXAMPLE,
  GET_ONE_PROJECT_RESPONSE_EXAMPLE,
  GET_RELATED_DATA_RESPONSE_EXAMPLE,
} from '../constants/projects.constants';

export class BaseProjectDto implements Partial<Projects> {
  @ApiProperty({
    type: String,
    example: 'Project Title',
    required: true,
    maxLength: 200,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @ApiProperty({
    type: String,
    example: 'Project Description',
    required: true,
    maxLength: 2000,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  description: string;

  @ApiProperty({
    type: Date,
    example: '2022-01-01T12:00:00.000Z',
    format: 'date-time',
    required: false,
  })
  @IsString()
  @IsOptional()
  finishDate?: Date;
}

export class CreateProjectDto extends BaseProjectDto {
  @ApiProperty({ type: Array, example: [1, 2, 3], required: true })
  @IsNotEmpty()
  @IsArray()
  categoryIds: number[];
}

export class UpdateProjectDto {
  @ApiProperty({
    type: String,
    example: 'Project Title',
    required: false,
    maxLength: 200,
  })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  title?: string;

  @ApiProperty({
    type: String,
    example: 'Project Description',
    required: false,
    maxLength: 2000,
  })
  @IsString()
  @IsOptional()
  @MaxLength(2000)
  description?: string;

  @ApiProperty({
    type: Number,
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;

  @ApiProperty({ type: Array, example: [1, 2, 3], required: false })
  @IsOptional()
  @IsArray()
  categoryIds?: number[];

  @ApiProperty({
    type: Date,
    example: '2022-01-01T12:00:00.000Z',
    format: 'date-time',
    required: false,
  })
  @IsString()
  @IsOptional()
  finishDate?: Date;
}

export interface GetProjectsResponse {
  id: number;
  title: string;
  description: string;
  createdAt?: Date;
  finishDate?: Date;
  updatedAt?: Date;
  categories: Categories;
}

export class GetProjectsResponseDto implements BaseResponseDto {
  @ApiProperty({
    type: Number,
    example: HttpStatus.OK,
  })
  statusCode: number;

  @ApiProperty({
    type: Object,
    example: GET_ALL_PROJECTS_RESPONSE_EXAMPLE,
  })
  data: Projects[];
}

export class GetOneProjectResponseDto implements BaseResponseDto {
  @ApiProperty({
    type: Number,
    example: HttpStatus.OK,
  })
  statusCode: number;

  @ApiProperty({
    type: Object,
    example: GET_ONE_PROJECT_RESPONSE_EXAMPLE,
  })
  data: Projects;
}

export interface ProjectsRelatedDataDto {
  categories: Categories[];
}

export class ProjectsRelatedDataReponseDto implements BaseResponseDto {
  @ApiProperty({
    type: Number,
    example: HttpStatus.OK,
  })
  statusCode: number;

  @ApiProperty({
    type: Object,
    example: GET_RELATED_DATA_RESPONSE_EXAMPLE,
  })
  data: ProjectsRelatedDataDto;
}

export class MemberToProjectDto {
  @ApiProperty({ type: Number, example: 1, required: true })
  @IsNumber()
  @IsNotEmpty()
  projectId: number;
  @ApiProperty({ type: String, example: 'uuid', required: true })
  @IsString()
  @IsNotEmpty()
  userId: string;
  @ApiProperty({ type: Number, example: 1, required: true })
  @IsNumber()
  @IsNotEmpty()
  projectRoleId: number;
}

export class UpdateMemberToProjectDto extends MemberToProjectDto {
  @ApiProperty({ type: Number, example: 1, required: true })
  @IsNumber()
  @IsNotEmpty()
  id: number;
}

export class DeleteMemberFromProjectDto {
  @ApiProperty({ type: Number, example: 1, required: true })
  @IsNumber()
  @IsNotEmpty()
  projectId: number;
  @ApiProperty({ type: String, example: 'uuid', required: true })
  @IsString()
  @IsNotEmpty()
  userId: string;
}
