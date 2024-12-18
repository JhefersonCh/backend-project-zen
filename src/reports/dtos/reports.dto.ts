import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class DateParamsForReportDto {
  @ApiProperty({
    type: String,
    description: 'Fecha de inicio',
    example: '2024-01-01T12:00:00.000Z',
    format: 'date-time',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  startDate: Date;

  @ApiProperty({
    type: String,
    description: 'Fecha de finalización',
    example: '2024-12-31T12:00:00.000Z',
    format: 'date-time',
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  endDate: Date;
}

export class MembersByProjectReportDto {
  @ApiProperty({
    type: String,
    description: 'ID del proyecto',
    example: 1,
    required: true,
  })
  @IsNotEmpty()
  @IsString()
  projectId: string;
}
