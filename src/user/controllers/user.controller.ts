import {
  CreatedRecordResponseDto,
  DeleteReCordResponseDto,
  UpdateRecordResponseDto,
} from './../../shared/dtos/response.dto';
import {
  CREATED_MESSAGE,
  DELETED_MESSAGE,
  UPDATED_MESSAGE,
} from './../../shared/constants/messages.constant';
import {
  CREATED_RESPONSE,
  DELETED_RESPONSE,
  DUPLICATED_RESPONSE,
  NOT_FOUND_RESPONSE,
  UPDATED_RESPONSE,
} from '../../shared/constants/response.constant';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiDefaultResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CrudUserUseCase } from '../useCases/crudUser.UC';
import {
  RegisterDto,
  GetUserResponseDto,
  UpdateUserDto,
  CreateUserDto,
} from '../dtos/crudUser.dto';

@Controller('user')
@ApiTags('Usuarios')
export class UserController {
  constructor(private readonly crudUserUseCase: CrudUserUseCase) {}
  @Post('/register')
  @ApiCreatedResponse(CREATED_RESPONSE)
  @ApiConflictResponse(DUPLICATED_RESPONSE)
  async register(@Body() user: RegisterDto): Promise<CreatedRecordResponseDto> {
    const rowId = await this.crudUserUseCase.create(user, 3);

    return {
      message: CREATED_MESSAGE,
      statusCode: HttpStatus.CREATED,
      data: rowId,
    };
  }

  @Delete('/:userId')
  @ApiDefaultResponse(DELETED_RESPONSE)
  @ApiNotFoundResponse(NOT_FOUND_RESPONSE)
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async deleteUserById(
    @Param('userId') userId: string,
  ): Promise<DeleteReCordResponseDto> {
    await this.crudUserUseCase.delete(userId);

    return {
      message: DELETED_MESSAGE,
      statusCode: HttpStatus.OK,
    };
  }

  @Get('/:userId')
  @ApiOkResponse({ type: GetUserResponseDto })
  @ApiNotFoundResponse(NOT_FOUND_RESPONSE)
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async getUserById(
    @Param('userId') userId: string,
  ): Promise<GetUserResponseDto> {
    const user = await this.crudUserUseCase.findOneByParams({
      where: { id: userId },
    });
    return {
      statusCode: HttpStatus.OK,
      data: {
        createdAt: user.createdAt,
        identification: user.identification,
        email: user.email,
        fullName: user.fullName,
        username: user.username,
        phone: user.phone,
        avatarUrl: user.avatarUrl,
        roleId: user.roleId,
        identificationTypeId: user.identificationTypeId,
      },
    };
  }

  @Patch('/:userId')
  @ApiOkResponse(UPDATED_RESPONSE)
  @ApiNotFoundResponse(NOT_FOUND_RESPONSE)
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async updateUser(
    @Param('userId') userId: string,
    @Body() body: UpdateUserDto,
  ): Promise<UpdateRecordResponseDto> {
    await this.crudUserUseCase.update(userId, body);
    return {
      message: UPDATED_MESSAGE,
      statusCode: HttpStatus.OK,
    };
  }

  @Post('/create')
  @ApiCreatedResponse(CREATED_RESPONSE)
  @ApiConflictResponse(DUPLICATED_RESPONSE)
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async createUser(
    @Body() user: CreateUserDto,
  ): Promise<CreatedRecordResponseDto> {
    const rowId = await this.crudUserUseCase.create(user, user.roleId);
    return {
      message: CREATED_MESSAGE,
      statusCode: HttpStatus.CREATED,
      data: rowId,
    };
  }
}
