import { Injectable } from '@nestjs/common';
import { TasksService } from '../services/tasks.service';
import {
  CreateTaskDto,
  GetAllByProjectIdAndMemberIdBodyDto,
  UpdateManyStatusesDto,
  UpdateTaskDto,
} from '../dtos/tasks.dto';

@Injectable()
export class TasksUseCase {
  constructor(private readonly tasksService: TasksService) {}
  async getRelatedData() {
    return await this.tasksService.getRelatedData();
  }

  async create(body: CreateTaskDto) {
    return await this.tasksService.create(body);
  }

  async update(body: UpdateTaskDto) {
    await this.tasksService.update(body);
  }

  async updateMany(body: UpdateManyStatusesDto) {
    return await this.tasksService.updateStatuses(body?.tasks);
  }

  async findById(id: number) {
    return await this.tasksService.findOneByParams({ where: { id } });
  }

  async findByProjectId(projectId: number) {
    return await this.tasksService.findManyByParams({
      where: { projectId },
    });
  }

  async findByMemberId(params: GetAllByProjectIdAndMemberIdBodyDto) {
    return await this.tasksService.findManyByParams({
      where: {
        memberId: Number(params.memberId),
        projectId: Number(params.projectId),
      },
    });
  }

  async deleteById(id: number) {
    await this.tasksService.deleteByParams({ id });
  }
}
