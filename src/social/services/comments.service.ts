import { Comments } from './../../shared/entities/comments.entity';
/* eslint-disable @typescript-eslint/no-unused-vars */
import { CommentBodyDto } from '../dtos/comment.dto';
import { CommentFiltersModel } from '../models/comment.model';
import { CommentsRepository } from './../../shared/repositories/comments.repository';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class CommentsService {
  constructor(private readonly commentsRepo: CommentsRepository) {}

  async create(body: CommentBodyDto, userId: string): Promise<void> {
    try {
      await this.commentsRepo.insert({
        content: body.content,
        rowId: body.rowId.toString(),
        rowTable: body.rowTable,
        userId,
      });
    } catch (error) {
      throw new HttpException(
        'Error al crear el comentario',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteById(id: number): Promise<void> {
    try {
      const comment = await this.commentsRepo.findOne({
        where: {
          id,
        },
      });
      if (!comment) {
        throw new HttpException(
          'El comentario no existe',
          HttpStatus.NOT_FOUND,
        );
      }
      await this.commentsRepo.delete({ id });
    } catch (error) {
      throw new HttpException(
        'Error al eliminar el comentario',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getAllByParams(params: CommentFiltersModel): Promise<Comments[]> {
    const comments = await this.commentsRepo
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .where(params.where)
      .select([
        'comment.content',
        'comment.id',
        'comment.createdAt',
        'comment.rowId',
        'comment.rowTable',
        'user.fullName',
        'user.id',
      ])
      .getMany();

    return comments;
  }
}
