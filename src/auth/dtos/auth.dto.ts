import { HttpStatus } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { BaseResponseDto } from 'src/shared/dtos/response.dto';

export class SignInResponseDto implements BaseResponseDto {
  @ApiProperty({
    type: Number,
    example: HttpStatus.OK,
  })
  statusCode: number;

  data: AuthTokenResponseDto;
}

export class SignOutResponseDto implements BaseResponseDto {
  @ApiProperty({
    type: Number,
    example: HttpStatus.OK,
  })
  statusCode: number;
  @ApiProperty({
    type: String,
    example: 'Logged out successfully',
  })
  message?: string;
}

export class InvalidAccessDataResponseDto implements BaseResponseDto {
  @ApiProperty({
    type: Number,
    example: HttpStatus.UNAUTHORIZED,
  })
  statusCode: number;

  //data: AuthTokenResponseDto;
}

export class SingInBodyDto {
  @ApiProperty({ example: 'john.doe@gmail.com', required: true })
  @IsNotEmpty()
  email: string;
  @ApiProperty({ example: '********', required: true })
  @IsNotEmpty()
  password: string;
}

export class RefreshTokenBodyDto {
  @ApiProperty({
    type: String,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  refreshToken: string;
}

export class SignOutBodyDto {
  @ApiProperty({
    example: '7985544c-4659-49f3-8d1c-42602a1c765b',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  userId: string;
  @ApiProperty({
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  accessToken: string;
  @ApiProperty({
    example: '75394f7c-429f-4f07-9f9e-9214eae0b398',
    required: true,
  })
  @IsString()
  @IsNotEmpty()
  accessSessionId: string;
}

export class AuthTokenResponseDto {
  @ApiProperty({
    type: Object,
    required: true,
    example: {
      accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
      refreshToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
    },
  })
  @IsObject()
  tokens: {
    accessToken: string;
    refreshToken: string;
  };

  @ApiProperty({
    type: Object,
    required: false,
    example: {
      id: '75394f7c-429f-4f07-9f9e-9214eae0b398',
      email: 'jhon.doe@gmail.com',
    },
  })
  @IsOptional()
  user: {
    id: string;
    email: string;
  };

  @ApiProperty({
    type: String,
    required: false,
    example: '75394f7c-429f-4f07-9f9e-9214eae0b398',
  })
  @IsOptional()
  accessSessionId?: string;
}

export class RecoveryPasswordBodyDto {
  @ApiProperty({ example: 'john.doe@gmail.com', required: true })
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
