import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';
@Entity({ name: 'Users' })
export class Users {
  @PrimaryColumn('uuid')
  id: string;

  @Column('varchar', {
    length: 100,
    nullable: false,
  })
  identification: string;

  @Column('varchar', {
    length: 255,
  })
  fullName: string;

  @Column('varchar', {
    length: 255,
    nullable: true,
  })
  avatarUrl?: string;

  @Column('varchar', {
    length: 255,
    nullable: true,
  })
  username?: string;

  @Column('int', {
    nullable: true,
  })
  phone?: number;

  @Column('varchar', {
    length: 255,
  })
  email: string;

  @Column('varchar', {
    length: 255,
  })
  @Exclude()
  password: string;

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
