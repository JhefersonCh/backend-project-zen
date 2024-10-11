import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Members } from '../entities/members.entity';

@Injectable()
export class MembersRepository extends Repository<Members> {
  constructor(dataSource: DataSource) {
    super(Members, dataSource.createEntityManager());
  }
}
