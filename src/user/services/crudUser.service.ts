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
import { RegisterDto, UpdateUserDto } from '../dtos/crudUser.dto';
import { UserFiltersModel } from '../models/user.model';
import { Users } from 'src/shared/entities/users.entity';
import { INVALID_ACCESS_DATA_MESSAGE } from 'src/auth/constants/messages.constants';

@Injectable()
export class CrudUserService {
  constructor(
    private userRepository: UserRepository,
    private readonly passwrodService: PasswordService,
  ) {}

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
}
