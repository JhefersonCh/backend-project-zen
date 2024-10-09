import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Projects } from './projects.entity';
import { Categories } from './categories.entity';

@Entity({ name: 'ProjectCategories' })
export class ProjectCategories {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ManyToOne(() => Projects, (project) => project.projectCategories, {
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

  @ManyToOne(() => Categories, (cat) => cat.projectCategories, {
    nullable: false,
    eager: true,
    onDelete: 'CASCADE',
  })
  category: Categories;
  @Column({
    type: 'int',
    nullable: false,
  })
  categoryId: number;

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
