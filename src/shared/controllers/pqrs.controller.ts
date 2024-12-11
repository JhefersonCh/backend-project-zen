import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { PqrsDto } from '../dtos/pqrs.dto';
import { CREATED_RESPONSE } from '../constants/response.constant';
import { PqrsService } from '../service/pqrs.service';

@Controller('pqrs')
@ApiTags('PQRS')
export class PqrsController {
  constructor(private readonly pqrService: PqrsService) {}

  @Post('send-pqr')
  @ApiOkResponse(CREATED_RESPONSE)
  async sendPqrs(
    @Body() body: PqrsDto,
  ): Promise<{ statusCode: number; message: string }> {
    await this.pqrService.sendPqrs(body.email, body.description, body.name);
    return {
      statusCode: HttpStatus.OK,
      message: 'PQR enviada con éxito',
    };
  }
}
