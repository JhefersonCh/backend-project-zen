import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class PqrsDto {
  @ApiProperty({
    type: String,
    description: 'Nombre de la persona que envía la PQR',
    example: 'Juan Perez',
    required: false,
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiProperty({
    type: String,
    description: 'Correo electrónico de la persona que envía la PQR',
    example: 'juanperez@example.com',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    description: 'Contenido de la pqr',
    example: 'Descripción de la pqr',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  description: string;
}
