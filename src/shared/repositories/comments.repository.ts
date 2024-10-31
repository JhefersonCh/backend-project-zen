import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Comments } from '../entities/comments.entity';

@Injectable()
export class CommentsRepository extends Repository<Comments> {
  constructor(dataSource: DataSource) {
    super(Comments, dataSource.createEntityManager());
  }
}
