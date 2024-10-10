import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Categories } from '../entities/categories.entity';

@Injectable()
export class CategoryRepository extends Repository<Categories> {
  constructor(dataSource: DataSource) {
    super(Categories, dataSource.createEntityManager());
  }
}
