import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ProjectCategories } from './projectCategories.entity';

@Entity({ name: 'Projects' })
export class Projects {
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

  @CreateDateColumn({
    type: 'timestamp',
  })
  createdAt?: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  finishDate?: Date;

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

  @OneToMany(
    () => ProjectCategories,
    (projectCategory) => projectCategory.project,
  )
  projectCategories: ProjectCategories[];
}
