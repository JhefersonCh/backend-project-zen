import { IdentificationTypes } from './../../shared/entities/identificationTypes.entity';
import { Roles } from './../../shared/entities/roles.entity';
import { ParamsPaginationDto } from './../../shared/dtos/pagination.dto';
import { ApiProperty } from '@nestjs/swagger';
import { Users } from 'src/shared/entities/users.entity';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BaseResponseDto } from 'src/shared/dtos/response.dto';
import { HttpStatus } from '@nestjs/common';
import { USER_DATA_RESPONSE_EXAMPLE } from '../constants/user.constant';

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
    type: Number,
    required: true,
    example: 1,
  })
  @IsNumber()
  identificationTypeId: number;

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
    type: String,
    required: false,
    example: 912345678,
  })
  @IsOptional()
  phone?: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'john.doe@gmail.com',
  })
  @IsEmail()
  email: string;
}

export class RegisterDto extends UserDto {
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
    type: Number,
    required: true,
    example: 1,
  })
  @IsNumber()
  identificationTypeId: number;

  @ApiProperty({
    type: String,
    required: true,
    example: '********',
  })
  @IsString()
  @IsNotEmpty()
  passwordConfirmation: string;
}

export class CreateUserDto extends RegisterDto {
  @ApiProperty({
    type: Number,
    required: true,
    example: 1,
  })
  @IsNumber()
  @IsNotEmpty()
  roleId: number;
}

export interface UserDataResponse {
  fullName: string;
  identificationTypeId: number;
  roleId: number;
  identification: string;
  username: string;
  email: string;
  createdAt: Date;
  phone: string;
  avatarUrl: string;
}

export class UpdateUserDto {
  @ApiProperty({
    type: String,
    required: false,
    example: '@john.doe',
  })
  @IsString()
  @IsOptional()
  username?: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'John Doe',
  })
  @IsString()
  @IsOptional()
  fullName?: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '321645789',
  })
  @IsNumber()
  @IsOptional()
  phone?: string;

  @ApiProperty({
    type: String,
    required: false,
    example: 'www.example.com',
  })
  @IsString()
  @IsOptional()
  avatarUrl?: string;
}

export class GetUserResponseDto implements BaseResponseDto {
  @ApiProperty({
    type: Number,
    example: HttpStatus.OK,
  })
  statusCode: number;
  @ApiProperty({
    type: Object,
    example: USER_DATA_RESPONSE_EXAMPLE,
  })
  data: UserDataResponse;
}

export class PaginatedListUsersParamsDto extends ParamsPaginationDto {
  @ApiProperty({
    type: String,
    required: false,
    example: 'John Doe',
  })
  @IsString()
  @IsOptional()
  fullName?: string;
  @ApiProperty({
    type: String,
    required: false,
    example: '@john.doe',
  })
  @IsString()
  @IsOptional()
  username?: string;
  @ApiProperty({
    type: String,
    required: false,
    example: 'john.doe@gmail.com',
  })
  @IsEmail()
  @IsOptional()
  email?: string;
  @ApiProperty({
    type: String,
    required: false,
    example: 1,
  })
  @IsString()
  @IsOptional()
  roleId?: number;
  @ApiProperty({
    type: String,
    required: false,
    example: '123456789',
  })
  @IsString()
  @IsOptional()
  identification?: string;
  @ApiProperty({
    type: Number,
    required: false,
    example: '3203203203',
  })
  @IsString()
  @IsOptional()
  phone?: string;

  @ApiProperty({
    type: String,
    required: false,
    example: '1',
  })
  @IsString()
  @IsOptional()
  identificationTypeId?: number;
}

export interface CreateUserRelatedDataDto {
  roles?: Roles[];
  identificationTypes: IdentificationTypes[];
}

export class CreateUserRelatedDataReponseDto implements BaseResponseDto {
  @ApiProperty({
    type: Number,
    example: HttpStatus.OK,
  })
  statusCode: number;
  @ApiProperty({
    type: Object,
    example: '',
  })
  data: CreateUserRelatedDataDto;
}

export class ChangePasswordBaseDto {
  @ApiProperty({
    type: String,
    required: true,
    example: '********',
  })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
  @ApiProperty({
    type: String,
    required: true,
    example: '********',
  })
  @IsString()
  @IsNotEmpty()
  confirmNewPassword: string;
}

export class ChangePasswordDto extends ChangePasswordBaseDto {
  @ApiProperty({
    type: String,
    required: true,
    example: '********',
  })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;
}

export class RecoveryPasswordDto extends ChangePasswordBaseDto {
  @ApiProperty({
    type: String,
    required: true,
    example: 'uuid',
  })
  @IsString()
  @IsNotEmpty()
  userId: string;
  @ApiProperty({
    type: String,
    required: true,
    example: 'token',
  })
  @IsString()
  @IsNotEmpty()
  resetToken: string;
}
