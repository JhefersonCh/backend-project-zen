import { MembersService } from './../projects/services/members.service';
import { TagRepository } from './../shared/repositories/tag.repository';
import { TaskTagsRepository } from './../shared/repositories/taskTags.repository';
import { TaskRepository } from './../shared/repositories/task.repository';
import { StatusRepository } from './../shared/repositories/status.repository';
import { PriorityRepository } from './../shared/repositories/priority.repository';
import { ProjectCategoriesRepository } from './../shared/repositories/projectCategories.repository';
import { ProjectRepository } from './../shared/repositories/project.repository';
import { UserRepository } from 'src/shared/repositories/user.repository';
import { ProjectRolesRepository } from './../shared/repositories/projectRol.repository';
import { TasksService } from 'src/projects/services/tasks.service';
import { MembersRepository } from './../shared/repositories/members.repository';
import { CategoryRepository } from './../shared/repositories/category.repository';
import { CrudProjectsService } from './../projects/services/crudProjects.service';
import { ProjectsService } from './../projects/services/projects.service';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { ReportsController } from './controllers/reports.controller';
import { ReportsUseCase } from './useCases/reports.UC';
import { ReportsService } from './services/reports.service';
import { FormatReportsService } from './services/formatReports.service';

@Module({
  imports: [PassportModule.register({ defaultStrategy: 'jwt' })],
  controllers: [ReportsController],
  providers: [
    ReportsUseCase,
    ReportsService,
    ProjectsService,
    CrudProjectsService,
    CategoryRepository,
    MembersRepository,
    TasksService,
    ProjectRolesRepository,
    UserRepository,
    ProjectRepository,
    ProjectCategoriesRepository,
    PriorityRepository,
    StatusRepository,
    TaskRepository,
    TaskTagsRepository,
    TagRepository,
    MembersService,
    FormatReportsService,
  ],
  exports: [],
})
export class ReportsModule {}
