import { TaskRepository } from './../../shared/repositories/task.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepo: TaskRepository) {}
  async validateUsersWithTasksPending() {
    const currentDate = new Date();
    const tomorrowDate = new Date();
    tomorrowDate.setDate(currentDate.getDate() + 1);

    const qb = this.tasksRepo
      .createQueryBuilder('task')
      .select([
        'task.id as id',
        'task.title as title',
        'task.description as description',
        'task.deadline as deadline',
        'status.title as status',
        'user.fullName as fullName',
        'user.email as email',
        'task.projectId as projectId',
        'project.title as projectTitle',
        'priority.title as priority',
      ])
      .innerJoin('task.status', 'status')
      .innerJoin('task.member', 'member')
      .innerJoin('member.user', 'user')
      .innerJoin('task.priority', 'priority')
      .innerJoin('task.project', 'project')
      .where('status.title IN (:...statuses)', {
        statuses: ['No iniciada', 'En progreso'],
      })
      .andWhere('task.deadline BETWEEN :today AND :tomorrow', {
        today: currentDate.toISOString().split('T')[0],
        tomorrow: tomorrowDate.toISOString().split('T')[0],
      });

    const tasks = await qb.getRawMany();

    return tasks;
  }
}
