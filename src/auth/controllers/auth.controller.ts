import { Body, Controller, HttpStatus, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  InvalidAccessDataResponseDto,
  RefreshTokenBodyDto,
  SignInResponseDto,
  SignOutBodyDto,
  SignOutResponseDto,
  SingInBodyDto,
} from '../dtos/auth.dto';
import { INVALID_ACCESS_DATA_MESSAGE } from '../constants/messages.constants';
import { AuthUseCase } from '../useCases/auth.UC';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@ApiTags('Autenticación')
export class AuthController {
  constructor(private readonly authUseCase: AuthUseCase) {}
  @Post('/sign-in')
  @ApiOkResponse({ type: SignInResponseDto })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: INVALID_ACCESS_DATA_MESSAGE,
    type: InvalidAccessDataResponseDto,
  })
  async signIn(@Body() body: SingInBodyDto): Promise<SignInResponseDto> {
    const data = await this.authUseCase.signIn(body);
    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @Post('/sign-out')
  @ApiOkResponse({
    status: HttpStatus.OK,
    description: 'Sesión finalizada correctamente',
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: INVALID_ACCESS_DATA_MESSAGE,
    type: InvalidAccessDataResponseDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async signOut(@Body() body: SignOutBodyDto): Promise<SignOutResponseDto> {
    await this.authUseCase.signOut(body);
    return {
      statusCode: HttpStatus.OK,
      message: 'Sesión finalizada correctamente',
    };
  }

  @Post('/refresh-token')
  @ApiOkResponse({
    status: HttpStatus.OK,
  })
  @ApiUnauthorizedResponse({
    status: HttpStatus.UNAUTHORIZED,
    description: INVALID_ACCESS_DATA_MESSAGE,
    type: InvalidAccessDataResponseDto,
  })
  async refreshToken(
    @Body() body: RefreshTokenBodyDto,
  ): Promise<SignInResponseDto> {
    const data = await this.authUseCase.refreshToken(body);
    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }
}
