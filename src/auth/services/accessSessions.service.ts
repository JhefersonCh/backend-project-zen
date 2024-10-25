import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import {
  AccessSessionsFiltersModel,
  AccessSessionsModel,
} from '../models/accessSessions.model';
import { AccessSessionsRepository } from 'src/shared/repositories/accessSessions.repository';
import { AccessSessions } from 'src/shared/entities/accessSessions.entity';
import { NOT_FOUND_MESSAGE } from 'src/shared/constants/messages.constant';

@Injectable()
export class AccessSessionsService {
  constructor(
    private readonly accessSessionsRepository: AccessSessionsRepository,
  ) {}

  async generateSession(body: AccessSessionsModel): Promise<string> {
    return (await this.accessSessionsRepository.insert(body)).identifiers[0].id;
  }

  async findOneByParams(
    params: AccessSessionsFiltersModel,
  ): Promise<AccessSessions> {
    return await this.accessSessionsRepository.findOne({
      where: { ...params },
    });
  }

  async delete(id: string): Promise<void> {
    const sessionExists = await this.findOneByParams({ id });
    if (!sessionExists) {
      throw new HttpException(NOT_FOUND_MESSAGE, HttpStatus.NOT_FOUND);
    }
    await this.accessSessionsRepository.delete(id);
  }
}
