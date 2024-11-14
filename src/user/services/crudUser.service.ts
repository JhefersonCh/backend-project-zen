import { RepositoriesService } from './../../shared/service/repositories.service';
import { Roles } from './../../shared/entities/roles.entity';

/* eslint-disable @typescript-eslint/no-unused-expressions */
import { PageMetaDto } from './../../shared/dtos/pageMeta.dto';
import { ResponsePaginationDto } from './../../shared/dtos/pagination.dto';
import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import {
  NOT_FOUND_MESSAGE,
  PASSWORDS_NOT_MATCH,
} from 'src/shared/constants/messages.constant';
import { DUPLICATED_RESPONSE } from 'src/shared/constants/response.constant';
import { UserRepository } from 'src/shared/repositories/user.repository';
import { PasswordService } from './password.service';
import {
  CreateUserRelatedDataDto,
  PaginatedListUsersParamsDto,
  RegisterDto,
  UpdateUserDto,
} from '../dtos/crudUser.dto';
import { UserFiltersModel } from '../models/user.model';
import { Users } from 'src/shared/entities/users.entity';
import { INVALID_ACCESS_DATA_MESSAGE } from 'src/auth/constants/messages.constants';
import { ILike, Like } from 'typeorm';
import { IdentificationTypes } from 'src/shared/entities/identificationTypes.entity';

@Injectable()
export class CrudUserService {
  constructor(
    private userRepository: UserRepository,
    private readonly passwrodService: PasswordService,
    private readonly repositoriesService: RepositoriesService,
  ) {}

  async getRelatedDataToCreate(
    isRegister: boolean,
  ): Promise<CreateUserRelatedDataDto> {
    const identificationTypes =
      await this.repositoriesService.getEntities<IdentificationTypes>(
        this.repositoriesService.repositories.identificationType,
      );
    if (!isRegister) {
      const roles = await this.repositoriesService.getEntities<Roles>(
        this.repositoriesService.repositories.roles,
      );
      return { identificationTypes, roles };
    }
    return { identificationTypes };
  }

  async create(user: RegisterDto, roleId: number): Promise<{ rowId: string }> {
    const userExists = await this.userRepository.findOne({
      where: [
        { identification: user.identification },
        { email: user.email },
        { id: user.id },
      ],
    });

    if (userExists) {
      throw new HttpException(DUPLICATED_RESPONSE, HttpStatus.CONFLICT);
    }
    if (user.password !== user.passwordConfirmation) {
      throw new HttpException(PASSWORDS_NOT_MATCH, HttpStatus.CONFLICT);
    }

    const userWithRoleId = {
      ...user,
      roleId,
    };

    const createdUser = await this.userRepository.save({
      ...userWithRoleId,
      password: await this.passwrodService.generateHash(user.password),
    });
    return { rowId: createdUser.id };
  }

  async delete(userId: string): Promise<void> {
    const userExists = await this.findOneByParams({
      where: { id: userId },
    });
    if (!userExists) {
      throw new HttpException(NOT_FOUND_MESSAGE, HttpStatus.NOT_FOUND);
    }
    await this.userRepository.delete(userId);
  }

  async findOneByParams(
    params: UserFiltersModel,
    login: boolean = false,
  ): Promise<Users> {
    const user = await this.userRepository.findOne({
      where: { ...params.where },
    });
    if (!user) {
      if (!login) {
        throw new HttpException(NOT_FOUND_MESSAGE, HttpStatus.NOT_FOUND);
      } else {
        throw new UnauthorizedException(INVALID_ACCESS_DATA_MESSAGE);
      }
    }
    return user;
  }

  async update(userId: string, params: UpdateUserDto): Promise<void> {
    this.userRepository.update({ id: userId }, params);
  }

  async paginatedList(params: PaginatedListUsersParamsDto) {
    const skip = (params.page - 1) * params.perPage;
    const where = {};

    params.email && Object.assign(where, { email: ILike(`%${params.email}%`) });
    params.fullName &&
      Object.assign(where, { fullName: ILike(`%${params.fullName}%`) });
    params.username &&
      Object.assign(where, { username: ILike(`%${params.username}%`) });
    params.roleId && Object.assign(where, { roleId: params.roleId });
    params.identification &&
      Object.assign(where, {
        identification: Like(`%${params.identification}%`),
      });
    params.phone && Object.assign(where, { phone: params.phone });
    params.identificationTypeId &&
      Object.assign(where, {
        identificationTypeId: params.identificationTypeId,
      });

    const searchConditions = [];
    if (params.search) {
      searchConditions.push(
        { fullName: ILike(`%${params.search}%`) },
        { username: ILike(`%${params.search}%`) },
        { identification: Like(`%${params.search}%`) },
        { email: ILike(`%${params.search}%`) },
      );
    }

    const [entities, itemCount] = await this.userRepository.findAndCount({
      where: searchConditions.length ? [where, ...searchConditions] : where,
      skip,
      take: params.perPage,
      order: { createdAt: params.order },
    });

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto: params });

    return new ResponsePaginationDto(entities, pageMetaDto);
  }
}
