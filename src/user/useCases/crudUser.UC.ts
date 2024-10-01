import { Injectable } from '@nestjs/common';
import { CrudUserService } from '../services/crudUser.service';
import { CreateUserDto } from '../dtos/crudUser.dto';

@Injectable()
export class CrudUserUseCase {
  constructor(private userService: CrudUserService) {}
  async create(user: CreateUserDto) {
    return await this.userService.create(user);
  }

  async delete(userId: string) {
    return await this.userService.delete(userId);
  }
}
