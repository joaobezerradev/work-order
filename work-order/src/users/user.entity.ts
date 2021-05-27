import { BaseEntity } from '../commons/entities/abstract.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class UserEntity extends BaseEntity {
  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
}
