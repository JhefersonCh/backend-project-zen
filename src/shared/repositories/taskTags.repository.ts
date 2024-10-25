import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { TaskTags } from '../entities/taskTags.entity';

@Injectable()
export class TaskTagsRepository extends Repository<TaskTags> {
  constructor(dataSource: DataSource) {
    super(TaskTags, dataSource.createEntityManager());
  }
}
