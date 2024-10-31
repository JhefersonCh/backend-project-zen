import {
  CreatedRecordResponseDto,
  DeleteReCordResponseDto,
} from './../../shared/dtos/response.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CommentsUseCase } from '../useCases/comments.UC';
import { AuthGuard } from '@nestjs/passport';
import {
  CommentBodyDto,
  GetCommentsListBodyDto,
  GetCommentsResponseDto,
} from '../dtos/comment.dto';

@Controller('comments')
@ApiTags('Comentarios')
export class CommentsController {
  constructor(private readonly commentsUC: CommentsUseCase) {}

  @Post('/')
  @ApiOkResponse({ type: CreatedRecordResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async createComment(
    @Body() body: CommentBodyDto,
    @Req() req,
  ): Promise<{ statusCode: number }> {
    await this.commentsUC.create(body, req.user.id);
    return {
      statusCode: HttpStatus.OK,
    };
  }

  @Delete('/:id')
  @ApiOkResponse({ type: DeleteReCordResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async deleteComment(
    @Param('id') id: number,
  ): Promise<DeleteReCordResponseDto> {
    await this.commentsUC.deleteById(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Comentario eliminado correctamente',
    };
  }

  @Get('/')
  @ApiOkResponse({ type: GetCommentsResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async getAllComments(
    @Query() body: GetCommentsListBodyDto,
  ): Promise<GetCommentsResponseDto> {
    const data = await this.commentsUC.getCommentsByRowTable(body);
    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }
}
