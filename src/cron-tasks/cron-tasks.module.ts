import { TaskRepository } from './../shared/repositories/task.repository';
import { MailsService } from './../shared/service/mails.service';
import { MailTemplateService } from './../shared/service/mail-template.service';
import { MailerGeneratorService } from './../shared/service/mailerGenerator.service';
import { Module } from '@nestjs/common';
import { CronTasksService } from './services/cronTasks.service';
import { TasksService } from './services/tasks.service';

@Module({
  imports: [],
  controllers: [],
  providers: [
    CronTasksService,
    MailerGeneratorService,
    MailTemplateService,
    MailsService,
    TasksService,
    TaskRepository,
  ],
})
export class CronTasksModule {}
