import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Projects } from '../entities/projects.entity';

@Injectable()
export class ProjectRepository extends Repository<Projects> {
  constructor(dataSource: DataSource) {
    super(Projects, dataSource.createEntityManager());
  }
}
