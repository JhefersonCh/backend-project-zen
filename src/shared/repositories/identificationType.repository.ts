import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { IdentificationTypes } from '../entities/identificationTypes.entity';

@Injectable()
export class IdentificationTypesRepository extends Repository<IdentificationTypes> {
  constructor(dataSource: DataSource) {
    super(IdentificationTypes, dataSource.createEntityManager());
  }
}
