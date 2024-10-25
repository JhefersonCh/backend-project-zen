import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Tasks } from '../entities/tasks.entity';

@Injectable()
export class TaskRepository extends Repository<Tasks> {
  constructor(dataSource: DataSource) {
    super(Tasks, dataSource.createEntityManager());
  }
}
