import { Column, Entity } from 'typeorm';

import { BaseEntity } from '../commons/entities/abstract.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column('character varying', { name: 'email', length: 300 })
  email: string;

  @Column('character varying', { name: 'password', length: 300 })
  password: string;
}
