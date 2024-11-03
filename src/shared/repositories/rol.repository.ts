import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Roles } from '../entities/roles.entity';

@Injectable()
export class RolesRepository extends Repository<Roles> {
  constructor(dataSource: DataSource) {
    super(Roles, dataSource.createEntityManager());
  }
}
