import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AdminPanelUseCase } from '../useCases/adminPanel.UC';
import { AuthGuard } from '@nestjs/passport';
import {
  BaseAdminPanelElementDto,
  GetAdminPanelReponseDto,
  UpdateAdminPanelElementDto,
} from '../dtos/adminPanel.dto';
import { AdminPanelElementValidatorPipe } from '../pipes/admin-panel-element-validator/admin-panel-element-validator.pipe';
import {
  CreatedRecordResponseDto,
  DeleteReCordResponseDto,
  UpdateRecordResponseDto,
} from '../dtos/response.dto';
import {
  CREATED_MESSAGE,
  DELETED_MESSAGE,
  UPDATED_MESSAGE,
} from '../constants/messages.constant';

@Controller('panel')
@ApiTags('Panel de administrador')
export class AdminPanelController {
  constructor(private readonly adminPanelUC: AdminPanelUseCase) {}

  @Get('')
  @ApiOkResponse({ type: GetAdminPanelReponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async getAdminPanelInfo(@Req() req): Promise<GetAdminPanelReponseDto> {
    const data = await this.adminPanelUC.getAdminPanelInfo(req.user.id);
    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @Post(':element')
  @ApiOkResponse({ type: CreatedRecordResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async createElement(
    @Req() req,
    @Param('element', new AdminPanelElementValidatorPipe())
    element: string,
    @Body() body: BaseAdminPanelElementDto,
  ): Promise<CreatedRecordResponseDto> {
    const rowId = await this.adminPanelUC.createAdminPanelElement(
      req.user.id,
      element,
      body,
    );

    return {
      statusCode: HttpStatus.CREATED,
      message: CREATED_MESSAGE,
      data: { rowId },
    };
  }

  @Patch(':element')
  @ApiOkResponse({ type: UpdateRecordResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async updateElement(
    @Param('element', new AdminPanelElementValidatorPipe()) element: string,
    @Body() body: UpdateAdminPanelElementDto,
    @Req() req,
  ): Promise<UpdateRecordResponseDto> {
    await this.adminPanelUC.updateAdminPanelElement(req.user.id, element, body);
    return {
      statusCode: HttpStatus.OK,
      message: UPDATED_MESSAGE,
    };
  }

  @Get(':element/:id')
  @ApiOkResponse()
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async getElementById(
    @Param('id') id: number,
    @Param('element', new AdminPanelElementValidatorPipe()) element: string,
    @Req() req,
  ) {
    return await this.adminPanelUC.getElementById(req.user.id, element, id);
  }

  @Delete(':element/:id')
  @ApiOkResponse({ type: DeleteReCordResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async deleteElementById(
    @Param('id') id: number,
    @Param('element', new AdminPanelElementValidatorPipe()) element: string,
    @Req() req,
  ): Promise<DeleteReCordResponseDto> {
    await this.adminPanelUC.deleteElement(req.user.id, element, id);
    return {
      statusCode: HttpStatus.OK,
      message: DELETED_MESSAGE,
    };
  }
}
