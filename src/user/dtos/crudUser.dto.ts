import { ApiProperty } from '@nestjs/swagger';
import { Users } from 'src/shared/entities/users.entity';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UserDto implements Partial<Users> {
  @ApiProperty({
    type: String,
    required: true,
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsString()
  id: string;

  @ApiProperty({
    type: String,
    required: true,
    example: '12345678-5',
  })
  @IsString()
  identification: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'John Doe',
  })
  @IsString()
  fullName: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'https://www.example.com/avatar.jpg',
  })
  @IsOptional()
  @IsString()
  avatarUrl?: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '@john.doe',
  })
  @IsOptional()
  username?: string;

  @ApiProperty({
    type: Number,
    required: false,
    example: 912345678,
  })
  @IsOptional()
  phone?: number;

  @ApiProperty({
    type: String,
    required: true,
    example: 'john.doe@gmail.com',
  })
  @IsEmail()
  email: string;
}

export class CreateUserDto extends UserDto {
  @ApiProperty({
    type: String,
    required: true,
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  @IsString()
  id: string;

  @ApiProperty({
    type: String,
    required: true,
    example: '12345678-5',
  })
  @IsString()
  identification: string;

  @ApiProperty({
    type: String,
    required: true,
    example: '@john.doe',
  })
  @IsString()
  username: string;

  @ApiProperty({
    type: String,
    required: true,
    example: '********',
  })
  @IsString()
  password: string;

  @ApiProperty({
    type: String,
    required: true,
    example: '********',
  })
  @IsString()
  @IsNotEmpty()
  passwordConfirmation: string;
}
