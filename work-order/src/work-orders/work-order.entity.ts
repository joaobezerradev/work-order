import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../commons/entities/abstract.entity';
import { UserEntity } from '../users/user.entity';
import { WorkOrderStatus } from './enums/work-order-status.enum';

@Entity('workorder')
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
  status: WorkOrderStatus;

  @Column({ type: Date })
  startDate = new Date();

  @Column({ type: Date })
  endDate: Date;
}
