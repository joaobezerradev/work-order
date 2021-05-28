import { BaseEntity } from '../commons/entities/abstract.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { getUTCDate } from '../commons/functions/get-utc-date.function';
import { WorkOrderEntity } from '../work-orders/work-order.entity';

@Entity('comments')
export class CommentEnity extends BaseEntity {
  @Column('uuid', { name: 'workorderid' })
  workOrderId: string;

  @ManyToOne(() => WorkOrderEntity, { cascade: true })
  @JoinColumn({ name: 'workorderid', referencedColumnName: 'id' })
  workOrder: WorkOrderEntity;

  @Column()
  description: string;

  @CreateDateColumn({ name: 'senddate', type: 'timestamp with time zone' })
  sendDate = getUTCDate();
}
