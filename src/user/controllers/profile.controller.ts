import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { ProfileUseCase } from '../useCases/profile.UC';
import { StatisticsResponseDto } from '../dtos/profile.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('profile')
@ApiTags('Perfil')
export class ProfileController {
  constructor(private readonly profileUseCase: ProfileUseCase) {}

  @Get('/statistics')
  @ApiOkResponse({
    description: 'Retorna as estatísticas do usuário',
    type: StatisticsResponseDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async getStatistics(@Req() req): Promise<StatisticsResponseDto> {
    const data = await this.profileUseCase.getStatistics(req.user.id);

    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }
}
