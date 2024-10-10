import { HttpStatus } from '@nestjs/common';
import { BaseResponseDto } from './../../shared/dtos/response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator';
import { GET_CATEGORY_BY_ID_REPONSE_EXAMPLE } from '../constants/projects.constants';

export class BaseCategoryDto {
  @ApiProperty({
    type: String,
    example: 'Electronics',
    required: true,
    maxLength: 200,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @ApiProperty({
    type: String,
    example: 'Category description',
    required: true,
    maxLength: 2000,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(2000)
  description: string;
}

export class UpdateCategoryDto extends BaseCategoryDto {
  @ApiProperty({
    type: Number,
    example: 1,
    required: true,
  })
  @IsNumber()
  @IsNotEmpty()
  id: number;
}

export interface GetCategoryReponse {
  id: number;
  title: string;
  description: string;
}

export class GetCategoryResponseDto implements BaseResponseDto {
  @ApiProperty({
    type: Number,
    example: HttpStatus.OK,
  })
  statusCode: number;

  @ApiProperty({
    type: Object,
    example: GET_CATEGORY_BY_ID_REPONSE_EXAMPLE,
  })
  data: GetCategoryReponse;
}
