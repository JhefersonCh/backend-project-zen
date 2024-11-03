import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from './response.dto';
import { HttpStatus } from '@nestjs/common';
import { IdentificationTypes } from '../entities/identificationTypes.entity';
import { Categories } from '../entities/categories.entity';
import { Tags } from '../entities/tags.entity';
import { ProjectRoles } from '../entities/projectRoles.entity';
import { Status } from '../entities/status.entity';
import { GET_ADMIN_PANEL_INFO_EXAMPLE } from '../constants/examples.constants';
import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';

export interface GetAdminPanelDto {
  identificationTypes: IdentificationTypes[];
  categories: Categories[];
  tags: Tags[];
  projectRoles: ProjectRoles[];
  stauses: Status[];
}

export class GetAdminPanelReponseDto implements BaseResponseDto {
  @ApiProperty({
    type: Number,
    example: HttpStatus.OK,
  })
  statusCode: number;
  @ApiProperty({
    type: Object,
    example: GET_ADMIN_PANEL_INFO_EXAMPLE,
  })
  data: GetAdminPanelDto;
}

export class BaseAdminPanelElementDto {
  @ApiProperty({
    type: String,
    example: 'Electronics',
    required: false,
    maxLength: 200,
  })
  @IsString()
  @IsOptional()
  @MaxLength(200)
  title?: string;

  @ApiProperty({
    type: String,
    example: 'Category description',
    required: false,
    maxLength: 2000,
  })
  @IsString()
  @IsOptional()
  @MaxLength(2000)
  description?: string;

  @ApiProperty({
    type: String,
    example: 'Role',
    required: false,
    maxLength: 100,
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  roleName?: string;

  @ApiProperty({
    type: String,
    example: 'CC',
    required: false,
    maxLength: 3,
  })
  @IsString()
  @IsOptional()
  @MaxLength(3)
  code?: string;

  @ApiProperty({
    type: String,
    example: 'Cédula',
    required: false,
    maxLength: 100,
  })
  @IsString()
  @IsOptional()
  @MaxLength(100)
  type?: string;
}

export class UpdateAdminPanelElementDto extends BaseAdminPanelElementDto {
  @ApiProperty({ type: Number, example: 1, required: true })
  @IsNumber()
  @IsNotEmpty()
  id: number;
}

export class GetAdminPanelElementDto {
  @ApiProperty({ type: Number, example: 1, required: true })
  @IsNumber()
  @IsNotEmpty()
  id: number;
  @ApiProperty({ type: String, example: 'Priority', required: true })
  @IsString()
  @IsNotEmpty()
  element: string;
}
