import { MailsService } from './../shared/service/mails.service';
import { MailTemplateService } from './../shared/service/mail-template.service';
import { MailerGeneratorService } from '../shared/service/mailerGenerator.service';
import { TagRepository } from './../shared/repositories/tag.repository';
import { TaskTagsRepository } from './../shared/repositories/taskTags.repository';
import { TaskRepository } from './../shared/repositories/task.repository';
import { StatusRepository } from './../shared/repositories/status.repository';
import { PriorityRepository } from './../shared/repositories/priority.repository';
import { UserRepository } from './../shared/repositories/user.repository';
import { ProjectRolesRepository } from '../shared/repositories/projectRol.repository';
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
import { TasksController } from './controllers/tasks.controller';
import { TasksUseCase } from './useCases/tasks.UC';
import { TasksService } from './services/tasks.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ProjectsListener } from './events/project.listener';

@Module({
  imports: [
    // SharedModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    EventEmitterModule.forRoot(),
  ],
  controllers: [ProjectsController, MembersController, TasksController],
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
    TasksUseCase,
    TasksService,
    PriorityRepository,
    StatusRepository,
    TaskRepository,
    TaskTagsRepository,
    TagRepository,
    MailerGeneratorService,
    MailTemplateService,
    MailsService,
    ProjectsListener,
  ],
  exports: [],
})
export class ProjectsModule {}
