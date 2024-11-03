import { RepositoriesService } from './../shared/service/repositories.service';
import { StatusRepository } from './../shared/repositories/status.repository';
import { PriorityRepository } from './../shared/repositories/priority.repository';
import { ProjectRolesRepository } from './../shared/repositories/projectRol.repository';
import { TagRepository } from './../shared/repositories/tag.repository';
import { CategoryRepository } from './../shared/repositories/category.repository';
import { AdminPanelService } from './../shared/service/adminPanel.service';
import { IdentificationTypesRepository } from './../shared/repositories/identificationType.repository';
import { RolesRepository } from './../shared/repositories/rol.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { CrudUserService } from './services/crudUser.service';
import { UserRepository } from 'src/shared/repositories/user.repository';
import { SharedModule } from 'src/shared/shared.module';
import { CrudUserUseCase } from './useCases/crudUser.UC';
import { PasswordService } from './services/password.service';
import { JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    SharedModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [UserController],
  providers: [
    CrudUserService,
    UserRepository,
    CrudUserUseCase,
    PasswordService,
    JwtService,
    RolesRepository,
    IdentificationTypesRepository,
    AdminPanelService,
    CategoryRepository,
    TagRepository,
    ProjectRolesRepository,
    PriorityRepository,
    StatusRepository,
    RepositoriesService,
  ],
})
export class UserModule {}
