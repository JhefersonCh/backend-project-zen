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
  GetManyTasksResponse,
  GetTaskByIdResponse,
  TasksRelatedDataResponse,
  UpdateManyStatusesDto,
  UpdateTaskDto,
} from '../dtos/tasks.dto';

@Controller('tasks')
@ApiTags('Tareas')
export class TasksController {
  constructor(private readonly tasksUseCase: TasksUseCase) {}

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

  @Get('/find-by-member/:memberId')
  @ApiOkResponse({ type: GetManyTasksResponse })
  @ApiBearerAuth()
  @UseGuards(AuthGuard())
  async getTaskByMemberId(
    @Param('memberId') memberId: number,
  ): Promise<GetManyTasksResponse> {
    const data = await this.tasksUseCase.findByMemberId(memberId);
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
  async updateTask(@Body() body: UpdateTaskDto): Promise<void> {
    await this.tasksUseCase.update(body);
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
