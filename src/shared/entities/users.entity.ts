import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { IdentificationTypes } from './identificationTypes.entity';
import { Roles } from './roles.entity';
import { Members } from './members.entity';
@Entity({ name: 'Users' })
export class Users {
  @PrimaryColumn('uuid')
  id: string;

  @ManyToOne(() => IdentificationTypes, (idType) => idType.id, {
    nullable: false,
    eager: true,
  })
  identificationType: IdentificationTypes;

  @Column({
    type: 'int',
    nullable: false,
  })
  identificationTypeId: number;

  @ManyToOne(() => Roles, (role) => role.id, {
    nullable: false,
    eager: true,
  })
  role: Roles;

  @Column('int', {
    nullable: false,
  })
  roleId: number;

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

  @Column('varchar', {
    nullable: true,
  })
  phone?: string;

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

  @Column({ type: 'varchar', length: 200, nullable: true })
  resetToken?: string;

  @Column({ type: 'timestamp', nullable: true })
  resetTokenExpiry?: Date;

  @OneToMany(() => Members, (member) => member.user)
  Members: Members[];
}
