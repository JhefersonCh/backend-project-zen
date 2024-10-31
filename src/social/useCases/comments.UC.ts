import { Injectable } from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import { CommentBodyDto, GetCommentsListBodyDto } from '../dtos/comment.dto';

@Injectable()
export class CommentsUseCase {
  constructor(private readonly commentsService: CommentsService) {}

  async create(body: CommentBodyDto, userId: string) {
    return await this.commentsService.create(body, userId);
  }

  async deleteById(id: number) {
    return await this.commentsService.deleteById(id);
  }

  async getCommentsByRowTable(body: GetCommentsListBodyDto) {
    return await this.commentsService.getAllByParams({
      where: { rowTable: body.rowTable, rowId: body.rowId.toString() },
    });
  }
}
