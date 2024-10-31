import { HttpStatus } from '@nestjs/common';
import { BaseResponseDto } from './../../shared/dtos/response.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Comments } from 'src/shared/entities/comments.entity';

export class CommentBodyDto {
  @ApiProperty({ type: String, example: 'This is a comment', required: true })
  @IsString()
  @IsNotEmpty()
  content: string;

  @ApiProperty({ type: Number, example: 1, required: true })
  @IsNumber()
  @IsNotEmpty()
  rowId: number;

  @ApiProperty({ type: String, example: 'Projects', required: true })
  @IsString()
  @IsNotEmpty()
  rowTable: string;
}

export class GetCommentsListBodyDto {
  @ApiProperty({ type: String, example: '1', required: true })
  @IsString()
  @IsNotEmpty()
  rowId: string;

  @ApiProperty({ type: String, example: 'Projects', required: true })
  @IsString()
  @IsNotEmpty()
  rowTable: string;
}

export class GetCommentsResponseDto implements BaseResponseDto {
  @ApiProperty({
    type: Number,
    example: HttpStatus.OK,
  })
  statusCode: number;
  @ApiProperty({
    type: Object,
  })
  data: Comments[];
}
