import { Status } from './../entities/status.entity';
import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class StatusRepository extends Repository<Status> {
  constructor(dataSource: DataSource) {
    super(Status, dataSource.createEntityManager());
  }
}
