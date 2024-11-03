import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { ProjectRoles } from '../entities/projectRoles.entity';

@Injectable()
export class ProjectRolesRepository extends Repository<ProjectRoles> {
  constructor(dataSource: DataSource) {
    super(ProjectRoles, dataSource.createEntityManager());
  }
}
