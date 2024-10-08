import {
  DELETED_RESPONSE,
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
// import { AuthGuard } from 'src/auth/guards/auth.guard';
import {
  CREATED_MESSAGE,
  DELETED_MESSAGE,
  UPDATED_MESSAGE,
} from 'src/shared/constants/messages.constant';
import {
  CREATED_RESPONSE,
  DUPLICATED_RESPONSE,
  NOT_FOUND_RESPONSE,
} from 'src/shared/constants/response.constant';
import {
  CreatedRecordResponseDto,
  DeleteReCordResponseDto,
  UpdateRecordResponseDto,
} from 'src/shared/dtos/response.dto';
import {
  CreateUserDto,
  GetUserResponseDto,
  UpdateUserDto,
} from 'src/user/dtos/crudUser.dto';
import { CrudUserUseCase } from 'src/user/useCases/crudUser.UC';

@Controller('user')
@ApiTags('Usuarios')
export class UserController {
  constructor(private readonly crudUserUseCase: CrudUserUseCase) {}
  @Post('/register')
  @ApiCreatedResponse(CREATED_RESPONSE)
  @ApiConflictResponse(DUPLICATED_RESPONSE)
  async register(
    @Body() user: CreateUserDto,
  ): Promise<CreatedRecordResponseDto> {
    const rowId = await this.crudUserUseCase.create(user, 1);

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
    const user = await this.crudUserUseCase.findOneByParams({ id: userId });
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
}
