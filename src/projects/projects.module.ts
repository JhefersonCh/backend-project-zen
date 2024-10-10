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

@Module({
  imports: [
    // SharedModule.forRoot(),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [ProjectsController],
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
  ],
  exports: [],
})
export class ProjectsModule {}
