import { DELETED_RESPONSE } from '../../shared/constants/response.constant';
import {
  Body,
  Controller,
  Delete,
  HttpStatus,
  Param,
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
  ApiTags,
} from '@nestjs/swagger';
// import { AuthGuard } from 'src/auth/guards/auth.guard';
import {
  CREATED_MESSAGE,
  DELETED_MESSAGE,
} from 'src/shared/constants/messages.constant';
import {
  CREATED_RESPONSE,
  DUPLICATED_RESPONSE,
  NOT_FOUND_RESPONSE,
} from 'src/shared/constants/response.constant';
import {
  CreatedRecordResponseDto,
  DeleteReCordResponseDto,
} from 'src/shared/dtos/response.dto';
import { CreateUserDto } from 'src/user/dtos/crudUser.dto';
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
    const rowId = await this.crudUserUseCase.create(user);

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
}
