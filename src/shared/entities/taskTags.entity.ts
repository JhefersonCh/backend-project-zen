import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tasks } from './tasks.entity';
import { Tags } from './tags.entity';

@Entity({ name: 'TaskTags' })
export class TaskTags {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ManyToOne(() => Tasks, (task) => task.taskTags, {
    nullable: false,
    eager: true,
    onDelete: 'CASCADE',
  })
  task: Tasks;
  @Column({
    type: 'int',
    nullable: false,
  })
  taskId: number;

  @ManyToOne(() => Tags, (tag) => tag.taskTags, {
    nullable: false,
    eager: true,
    onDelete: 'CASCADE',
  })
  tag: Tags;
  @Column({
    type: 'int',
    nullable: false,
  })
  tagId: number;

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
}
