/* eslint-disable @typescript-eslint/no-unused-vars */
import { ProjectRepository } from './../../shared/repositories/project.repository';
import { UserRepository } from './../../shared/repositories/user.repository';
import { ProjectRolesRepository } from '../../shared/repositories/projectRol.repository';
import { ProjectRoles } from './../../shared/entities/projectRoles.entity';
import { MembersRepository } from './../../shared/repositories/members.repository';
import { CategoryRepository } from './../../shared/repositories/category.repository';
import { Categories } from './../../shared/entities/categories.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { MemberToProjectDto } from '../dtos/projects.dto';
import { Between, Equal, Not } from 'typeorm';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly _categoriyRepo: CategoryRepository,
    private readonly _memberRepo: MembersRepository,
    private readonly _projectRolesRepo: ProjectRolesRepository,
    private readonly _userRepo: UserRepository,
    private readonly _projectsRepo: ProjectRepository,
  ) {}

  async getRelatedData(): Promise<{
    categories: Categories[];
    roles: ProjectRoles[];
  }> {
    const categories = await this._categoriyRepo.find();
    const roles = await this._projectRolesRepo.find({
      where: { roleName: Not(Equal('Líder')) },
    });
    return { categories, roles };
  }

  async addMemberToProject(
    body: MemberToProjectDto,
    userId: string,
  ): Promise<string> {
    const userLeader = await this._memberRepo.findOne({
      where: { userId, projectId: body.projectId },
    });

    const userIsMember = await this._memberRepo.findOne({
      where: { userId: body.userId, projectId: body.projectId },
    });

    if (userIsMember) {
      throw new HttpException(
        'El usuario ya es miembro del proyecto.',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (userLeader?.projectRole?.roleName !== 'Líder') {
      throw new HttpException(
        'No está autorizado para añadir nuevos miembros.',
        HttpStatus.BAD_REQUEST,
      );
    }

    const userExists = await this._userRepo.findOne({
      where: { id: body.userId },
    });

    if (!userExists) {
      throw new HttpException(
        'El usuario que intenta añadir no existe.',
        HttpStatus.BAD_REQUEST,
      );
    }
    return (await this._memberRepo.insert(body)).identifiers[0].id;
  }

  async removeMemberFromProject(
    body: Partial<MemberToProjectDto>,
    userId: string,
  ): Promise<void> {
    const userLeader = await this._memberRepo.findOne({
      where: { userId, projectId: body.projectId },
    });
    const userIsMember = await this._memberRepo.findOne({
      where: { userId: body.userId, projectId: body.projectId },
    });

    if (userLeader?.projectRole?.roleName !== 'Líder') {
      throw new HttpException(
        'No está autorizado para eliminar este miembro.',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!userIsMember) {
      throw new HttpException(
        'El miembro que intenta eliminar no existe en este proyecto.',
        HttpStatus.BAD_REQUEST,
      );
    }
    await this._memberRepo.delete(body);
  }

  async getProjectsCountForUser(
    userId: string,
  ): Promise<{ total: number; leader: number }> {
    try {
      const result = await this._projectsRepo
        .createQueryBuilder('project')
        .select([
          'COUNT(project.id) AS total',
          'SUM(CASE WHEN member.userId = :userId AND projectRole.roleName = :leaderRole THEN 1 ELSE 0 END) AS leader',
        ])
        .leftJoin('project.members', 'member')
        .leftJoin('member.projectRole', 'projectRole')
        .where('project.deletedAt IS NULL')
        .andWhere('member.userId = :userId')
        .setParameters({
          userId,
          leaderRole: 'Líder',
        })
        .getRawOne();

      return {
        total: parseInt(result.total, 10) || 0,
        leader: parseInt(result.leader, 10) || 0,
      };
    } catch (error) {
      console.error('Error al obtener el conteo de proyectos:', error);
      throw new HttpException(
        'Error al obtener el conteo de proyectos para el usuario.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getProjectsByUserAndTime(
    userId: string,
    params: { startDate: Date; endDate: Date },
  ) {
    const result = await this._memberRepo
      .createQueryBuilder('member')
      .select("TO_CHAR(member.createdAt, 'YYYY-MM') AS monthYear")
      .addSelect('COUNT(*) AS count')
      .where('member.userId = :userId', { userId })
      .andWhere('member.createdAt BETWEEN :startDate AND :endDate', {
        startDate: params.startDate,
        endDate: params.endDate,
      })
      .groupBy('monthYear')
      .getRawMany();

    return result;
  }
}
