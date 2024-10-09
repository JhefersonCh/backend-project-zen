import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './users.entity';

@Entity({ name: 'Comments' })
export class Comments {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({
    type: 'varchar',
    length: 2000,
    nullable: false,
  })
  content: string;

  @ManyToOne(() => Users, (user) => user.id, {
    nullable: false,
    eager: true,
    onDelete: 'CASCADE',
  })
  user: Users;
  @Column({
    type: 'uuid',
    nullable: false,
  })
  userId: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  rowTable: string;

  @Column({
    type: 'varchar',
    nullable: false,
  })
  rowId: string;

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
