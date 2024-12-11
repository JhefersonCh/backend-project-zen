import { MailerGeneratorService } from './../../shared/service/mailerGenerator.service';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { TasksService } from '../services/tasks.service';
import { MembersService } from '../services/members.service';

@Injectable()
export class ProjectsListener {
  constructor(
    private readonly tasksService: TasksService,
    private readonly mailerService: MailerGeneratorService,
    private readonly membersService: MembersService,
  ) {}
  @OnEvent('assing-task.event')
  async handleAssignTask(payload: any) {
    const member = await this.membersService.findOneById(payload.memberId);
    const task = await this.tasksService.findOneByParams({
      where: { id: payload.taskId },
    });

    await this.mailerService.assignTaskMail(member.user, task);
  }
}
