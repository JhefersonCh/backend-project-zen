import {
  CREATED_MESSAGE,
  DELETED_MESSAGE,
  UPDATED_MESSAGE,
} from './../../shared/constants/messages.constant';
import {
  CreatedRecordResponseDto,
  DeleteReCordResponseDto,
  UpdateRecordResponseDto,
} from './../../shared/dtos/response.dto';
import {
  CREATED_RESPONSE,
  DELETED_RESPONSE,
  DUPLICATED_RESPONSE,
  NOT_FOUND_RESPONSE,
  UPDATED_RESPONSE,
} from './../../shared/constants/response.constant';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateProjectDto,
  GetOneProjectResponseDto,
  GetProjectsResponseDto,
  ProjectsRelatedDataReponseDto,
  UpdateProjectDto,
} from '../dtos/projects.dto';
import { CrudProjectsUseCase } from '../useCases/crudProjects.UC';
import { AuthGuard } from '@nestjs/passport';
// import {
//   BaseCategoryDto,
//   GetCategoryResponseDto as GetCategoryByIdResponseDto,
// } from '../dtos/category.dto';
import { CrudCategoriesUseCase } from '../useCases/crudCategories.UC';
import { ProjectsUseCase } from '../useCases/projects.UC';

@Controller('projects')
@ApiTags('Proyectos')
export class ProjectsController {
  constructor(
    private readonly _crudProjectsUC: CrudProjectsUseCase,
    private readonly _crudCategoriesUC: CrudCategoriesUseCase,
    private readonly _projectsUC: ProjectsUseCase,
  ) {}

  @Get('/related-data')
  @ApiOkResponse({ type: ProjectsRelatedDataReponseDto })
  @ApiNotFoundResponse(NOT_FOUND_RESPONSE)
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async getRelatedData(): Promise<ProjectsRelatedDataReponseDto> {
    const data = await this._projectsUC.getRelatedData();

    return {
      statusCode: HttpStatus.CREATED,
      data,
    };
  }

  @Post('/')
  @ApiCreatedResponse(CREATED_RESPONSE)
  @ApiConflictResponse(DUPLICATED_RESPONSE)
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async createProject(
    @Body() project: CreateProjectDto,
    @Req() req,
  ): Promise<CreatedRecordResponseDto> {
    const userId = req.user.id;
    const rowId = await this._crudProjectsUC.create(project, userId);

    return {
      message: CREATED_MESSAGE,
      statusCode: HttpStatus.CREATED,
      data: rowId,
    };
  }

  @Get('/byUser')
  @ApiOkResponse({ type: GetProjectsResponseDto })
  @ApiNotFoundResponse(NOT_FOUND_RESPONSE)
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async getAllProjectsByUser(@Req() req): Promise<GetProjectsResponseDto> {
    const userId = req.user.id;
    const data = await this._crudProjectsUC.findAllByUserId(userId);

    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  // @Post('/category')
  // @ApiCreatedResponse(CREATED_RESPONSE)
  // @ApiConflictResponse(DUPLICATED_RESPONSE)
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard())
  // async createCategory(
  //   @Body() project: BaseCategoryDto,
  // ): Promise<CreatedRecordResponseDto> {
  //   const rowId = await this._crudCategoriesUC.create(project);

  //   return {
  //     message: CREATED_MESSAGE,
  //     statusCode: HttpStatus.CREATED,
  //     data: rowId,
  //   };
  // }

  // @Get('/category/:id')
  // @ApiOkResponse({ type: GetCategoryByIdResponseDto })
  // @ApiNotFoundResponse(NOT_FOUND_RESPONSE)
  // @ApiBearerAuth()
  // @UseGuards(AuthGuard())
  // async getCategoryById(
  //   @Param('id') id: number,
  // ): Promise<GetCategoryByIdResponseDto> {
  //   const data = await this._crudCategoriesUC.findOneByParams(id);

  //   return {
  //     statusCode: HttpStatus.CREATED,
  //     data,
  //   };
  // }

  @Get('/')
  @ApiOkResponse({ type: GetProjectsResponseDto })
  @ApiNotFoundResponse(NOT_FOUND_RESPONSE)
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async getAllProjects(): Promise<GetProjectsResponseDto> {
    const data = await this._crudProjectsUC.findAllProjects();

    return {
      statusCode: HttpStatus.CREATED,
      data,
    };
  }

  @Get('/:id')
  @ApiOkResponse({ type: GetOneProjectResponseDto })
  @ApiNotFoundResponse(NOT_FOUND_RESPONSE)
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async getProjectById(
    @Param('id') id: number,
    @Req() req,
  ): Promise<GetOneProjectResponseDto> {
    const data = await this._crudProjectsUC.findOneProjectById(id, req.user.id);

    return {
      statusCode: HttpStatus.CREATED,
      data,
    };
  }

  @Patch('/')
  @ApiOkResponse(UPDATED_RESPONSE)
  @ApiNotFoundResponse(NOT_FOUND_RESPONSE)
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async updateProject(
    @Body() body: UpdateProjectDto,
  ): Promise<UpdateRecordResponseDto> {
    await this._crudProjectsUC.update(body);

    return {
      statusCode: HttpStatus.CREATED,
      message: UPDATED_MESSAGE,
    };
  }

  @Delete('/:id')
  @ApiOkResponse(DELETED_RESPONSE)
  @ApiNotFoundResponse(NOT_FOUND_RESPONSE)
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async deleteProject(
    @Param('id') id: number,
    @Req() req,
  ): Promise<DeleteReCordResponseDto> {
    await this._crudProjectsUC.delete(id, req.user.id);
    return {
      statusCode: HttpStatus.OK,
      message: DELETED_MESSAGE,
    };
  }
}
