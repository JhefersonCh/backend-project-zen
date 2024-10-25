import { Members } from './../../shared/entities/members.entity';
import { MembersRepository } from './../../shared/repositories/members.repository';
import { ProjectRolesRepository } from './../../shared/repositories/projecRoles.repository';
import { ProjectRoles } from './../../shared/entities/projectRoles.entity';
import { Injectable } from '@nestjs/common';
import { MemberFiltersModel } from '../models/params.model';
import { UpdateMemberToProjectDto } from '../dtos/projects.dto';

@Injectable()
export class MembersService {
  constructor(
    private readonly _projectRolesRepo: ProjectRolesRepository,
    private readonly _membersRepo: MembersRepository,
  ) {}

  async getRelatedData(): Promise<{ projectRoles: ProjectRoles[] }> {
    const projectRoles = await this._projectRolesRepo.find();
    return { projectRoles };
  }

  async getAllByParams(params: MemberFiltersModel): Promise<Members[]> {
    const queryBuilder = this._membersRepo.createQueryBuilder('member');

    if (params.where) {
      Object.keys(params.where).forEach((key) => {
        queryBuilder.andWhere(`member.${key} = :${key}`, {
          [key]: params.where[key],
        });
      });
    }

    queryBuilder
      .select([
        'member.id',
        'member.userId',
        'member.projectId',
        'member.projectRoleId',
        'member.createdAt',
        'member.updatedAt',
        'member.deletedAt',
      ])
      .innerJoinAndSelect('member.projectRole', 'projectRole')
      .innerJoinAndSelect('member.user', 'user');

    queryBuilder.distinctOn(['member.userId']);
    queryBuilder
      .orderBy('member.userId', 'ASC')
      .addOrderBy('member.createdAt', 'DESC');

    return await queryBuilder.getMany();
  }

  async update(body: UpdateMemberToProjectDto): Promise<void> {
    await this._membersRepo.update(body.id, body);
  }

  async findOneById(id: number): Promise<Members> {
    return await this._membersRepo.findOne({ where: { id } });
  }
}
