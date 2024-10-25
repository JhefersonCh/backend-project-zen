import { Priorities } from './../entities/priorities.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class PriorityRepository extends Repository<Priorities> {
  constructor(dataSource: DataSource) {
    super(Priorities, dataSource.createEntityManager());
  }
}
