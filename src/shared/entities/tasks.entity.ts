import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Projects } from './projects.entity';
import { Status } from './status.entity';
import { Priorities } from './priorities.entity';
import { TaskTags } from './taskTags.entity';
import { Assignments } from './assignments.entity';

@Entity({ name: 'Tasks' })
export class Tasks {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  title: string;

  @Column({
    type: 'varchar',
    length: 2000,
    nullable: false,
  })
  description: string;

  @ManyToOne(() => Projects, (project) => project.id, {
    nullable: false,
    eager: true,
    onDelete: 'CASCADE',
  })
  project: Projects;
  @Column({
    type: 'int',
    nullable: false,
  })
  projectId: number;

  @ManyToOne(() => Priorities, (priority) => priority.id, {
    nullable: false,
    eager: true,
    onDelete: 'CASCADE',
  })
  priority: Priorities;
  @Column({
    type: 'int',
    nullable: false,
  })
  priorityId: number;

  @ManyToOne(() => Status, (status) => status.id, {
    nullable: false,
    eager: true,
    onDelete: 'CASCADE',
  })
  status: Status;
  @Column({
    type: 'int',
    nullable: false,
  })
  statusId: number;

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt?: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    nullable: true,
  })
  updatedAt?: Date;

  @DeleteDateColumn({
    type: 'timestamp',
    nullable: true,
  })
  deletedAt?: Date;

  @OneToMany(() => TaskTags, (tastTag) => tastTag.tag)
  taskTags: TaskTags[];

  @OneToMany(() => Assignments, (assignment) => assignment.task)
  assignments: Assignments[];
}
