import { MembersRepository } from './../shared/repositories/members.repository';
import { MembersService } from './../projects/services/members.service';
import { TaskTagsRepository } from './../shared/repositories/taskTags.repository';
import { ProjectRepository } from './../shared/repositories/project.repository';
import { TaskRepository } from './../shared/repositories/task.repository';
import { ProjectsService } from './../projects/services/projects.service';
import { TasksService } from 'src/projects/services/tasks.service';
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
import { ProfileController } from './controllers/profile.controller';
import { ProfileUseCase } from './useCases/profile.UC';
import { ProfileService } from './services/profile.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([]),
    SharedModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [UserController, ProfileController],
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
    ProfileUseCase,
    ProfileService,
    TasksService,
    ProjectsService,
    TaskRepository,
    ProjectRepository,
    TaskTagsRepository,
    MembersService,
    MembersRepository,
  ],
})
export class UserModule {}
