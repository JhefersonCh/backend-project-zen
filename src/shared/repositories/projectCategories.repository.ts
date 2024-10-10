import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ProjectCategories } from '../entities/projectCategories.entity';

@Injectable()
export class ProjectCategoriesRepository extends Repository<ProjectCategories> {
  constructor(dataSource: DataSource) {
    super(ProjectCategories, dataSource.createEntityManager());
  }
}
