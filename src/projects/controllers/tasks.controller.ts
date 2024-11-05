import { ResponsePaginationDto } from './../../shared/dtos/pagination.dto';
import { Tasks } from './../../shared/entities/tasks.entity';
import { CREATED_MESSAGE } from './../../shared/constants/messages.constant';
import { TasksUseCase } from './../useCases/tasks.UC';
import {
  CreatedRecordResponseDto,
  DeleteReCordResponseDto,
  UpdateManyRecordsResponseDto,
  UpdateRecordResponseDto,
} from './../../shared/dtos/response.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateTaskDto,
  GetAllByProjectIdAndMemberIdBodyDto,
  GetManyTasksResponse,
  GetTaskByIdResponse,
  PaginatedListTasksParamsDto,
  TasksRelatedDataResponse,
  UpdateManyStatusesDto,
  UpdateTaskDto,
} from '../dtos/tasks.dto';

@Controller('tasks')
@ApiTags('Tareas')
export class TasksController {
  constructor(private readonly tasksUseCase: TasksUseCase) {}

  @Get('/paginated-list')
  @ApiOkResponse({ type: ResponsePaginationDto<Tasks> })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async getPaginatedList(
    @Query() params: PaginatedListTasksParamsDto,
  ): Promise<ResponsePaginationDto<Tasks>> {
    return await this.tasksUseCase.paginatedList(params);
  }

  @Get('/related-data')
  @ApiOkResponse({ type: TasksRelatedDataResponse })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async getRelatedData(): Promise<TasksRelatedDataResponse> {
    const data = await this.tasksUseCase.getRelatedData();
    return {
      statusCode: 200,
      data,
    };
  }

  @Get('/find-by-member')
  @ApiOkResponse({ type: GetManyTasksResponse })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async getTaskByMemberId(
    @Query() body: GetAllByProjectIdAndMemberIdBodyDto,
  ): Promise<GetManyTasksResponse> {
    const data = await this.tasksUseCase.findByMemberId(body);
    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @Delete('/:id')
  @ApiOkResponse({ type: DeleteReCordResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async deleteTask(@Param('id') id: number): Promise<DeleteReCordResponseDto> {
    await this.tasksUseCase.deleteById(id);
    return {
      statusCode: HttpStatus.OK,
      message: 'Tarea eliminada correctamente',
    };
  }

  @Post('/create')
  @ApiCreatedResponse({ type: CreatedRecordResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async createTask(
    @Body() body: CreateTaskDto,
  ): Promise<CreatedRecordResponseDto> {
    const rowId = await this.tasksUseCase.create(body);
    return {
      statusCode: HttpStatus.OK,
      message: CREATED_MESSAGE,
      data: { rowId },
    };
  }

  @Patch('/update')
  @ApiOkResponse({ type: UpdateRecordResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async updateTask(
    @Body() body: UpdateTaskDto,
  ): Promise<UpdateRecordResponseDto> {
    await this.tasksUseCase.update(body);
    return {
      statusCode: HttpStatus.OK,
      message: 'Tarea actualizada correctamente',
    };
  }

  @Get('/:id')
  @ApiOkResponse({ type: GetTaskByIdResponse })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async getTaskById(@Param('id') id: number): Promise<GetTaskByIdResponse> {
    const data = await this.tasksUseCase.findById(id);
    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @Get('/find-by-project/:projectId')
  @ApiOkResponse({ type: GetManyTasksResponse })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async getTaskByProjectId(
    @Param('projectId') projectId: number,
  ): Promise<GetManyTasksResponse> {
    const data = await this.tasksUseCase.findByProjectId(projectId);
    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }

  @Post('/update-statuses')
  @ApiOkResponse({ type: UpdateManyRecordsResponseDto })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async updateStatuses(
    @Body() body: UpdateManyStatusesDto,
  ): Promise<UpdateManyRecordsResponseDto> {
    const data = await this.tasksUseCase.updateMany(body);
    return {
      statusCode: HttpStatus.OK,
      data,
    };
  }
}
