import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Users } from './users.entity';

@Entity({ name: 'AccessSessions' })
export class AccessSessions {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToOne(() => Users, (user) => user.id, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  user?: Users;

  @Column('uuid', {
    nullable: false,
  })
  userId: string;

  @Column('varchar', { length: 2000 })
  accessToken: string;

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
