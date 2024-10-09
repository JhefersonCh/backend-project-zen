import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './users.entity';
import { Tasks } from './tasks.entity';

@Entity({ name: 'Assignments' })
export class Assignments {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ManyToOne(() => Users, (user) => user.assignments, {
    nullable: false,
    eager: true,
    onDelete: 'CASCADE',
  })
  user: Users;

  @ManyToOne(() => Tasks, (task) => task.assignments, {
    nullable: false,
    eager: true,
    onDelete: 'CASCADE',
  })
  task: Tasks;

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
