import { Column, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../commons/entities/abstract.entity';
import { UserEntity } from '../users/user.entity';
import { OrderStatusEnum } from './enums/order-status.enum';

export class WorkOrderEntity extends BaseEntity {
  @Column('uuid')
  userId: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  status: OrderStatusEnum;
}
