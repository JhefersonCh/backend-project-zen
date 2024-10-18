import { UserRepository } from './../shared/repositories/user.repository';
import { ProjectRolesRepository } from './../shared/repositories/projecRoles.repository';
import { ProjectCategoriesRepository } from './../shared/repositories/projectCategories.repository';
import { ProjectRepository } from './../shared/repositories/project.repository';
import { CategoryRepository } from './../shared/repositories/category.repository';
import { PassportModule } from '@nestjs/passport';
//import { SharedModule } from './../shared/shared.module';
import { Module } from '@nestjs/common';
import { ProjectsController } from './controllers/projects.controller';
import { CrudProjectsUseCase } from './useCases/crudProjects.UC';
import { CrudCategoriesUseCase } from './useCases/crudCategories.UC';
import { CrudCategoriesService } from './services/crudCategories.service';
import { CrudProjectsService } from './services/crudProjects.service';
import { ProjectsUseCase } from './useCases/projects.UC';
import { ProjectsService } from './services/projects.service';
import { MembersRepository } from './../shared/repositories/members.repository';
import { MembersController } from './controllers/members.controller';
import { MembersUseCase } from './useCases/members.UC';
import { MembersService } from './services/members.service';

@Module({
  imports: [
    // SharedModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [ProjectsController, MembersController],
  providers: [
    CrudProjectsUseCase,
    CrudCategoriesUseCase,
    CrudCategoriesService,
    CategoryRepository,
    ProjectRepository,
    ProjectCategoriesRepository,
    CrudProjectsService,
    ProjectsUseCase,
    ProjectsService,
    MembersRepository,
    ProjectRolesRepository,
    MembersUseCase,
    MembersService,
    UserRepository,
  ],
  exports: [],
})
export class ProjectsModule {}
