import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';
import { Users } from './users.entity';
import { Projects } from './projects.entity';
import { ProjectRoles } from './projectRoles.entity';

@Entity('Members')
export class Members {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Users, (user) => user.id, {
    nullable: false,
    eager: true,
    onDelete: 'CASCADE',
  })
  user: Users;
  @Column({ type: 'varchar' })
  userId: string;

  @ManyToOne(() => Projects, (project) => project.id, {
    nullable: false,
    eager: true,
    onDelete: 'CASCADE',
  })
  project: Projects;
  @Column({ type: 'int', nullable: false })
  projectId: number;

  @ManyToOne(() => ProjectRoles, (projectRole) => projectRole.id, {
    nullable: false,
    eager: true,
    onDelete: 'CASCADE',
  })
  projectRole: ProjectRoles;
  @Column({ type: 'int', nullable: false })
  projectRoleId: number;

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
