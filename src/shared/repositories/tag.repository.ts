import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Tags } from '../entities/tags.entity';

@Injectable()
export class TagRepository extends Repository<Tags> {
  constructor(dataSource: DataSource) {
    super(Tags, dataSource.createEntityManager());
  }
}
