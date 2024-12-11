import { MailerGeneratorService } from './../../shared/service/mailerGenerator.service';

import { Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { TasksService } from './tasks.service';

@Injectable()
export class CronTasksService {
  constructor(
    private readonly mailerGeneratorService: MailerGeneratorService,
    private readonly tasksService: TasksService,
  ) {}

  /**
   * Cron task to send a mail to the user with tasks pending
   * cron expression: 0 22 * * *
   * cron execute: all days at 22:00
   */
  @Cron('0 22 * * *')
  async test() {
    const tasks = await this.tasksService.validateUsersWithTasksPending();
    for await (const task of tasks) {
      await this.mailerGeneratorService.withTasksPendingMail(task);
    }
  }
}
