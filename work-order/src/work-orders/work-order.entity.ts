import { CommentEnity } from '../comments/comment.entity';
import { getUTCDate } from '../commons/functions/get-utc-date.function';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { BaseEntity } from '../commons/entities/abstract.entity';
import { UserEntity } from '../users/user.entity';
import { WorkOrderStatus } from './enums/work-order-status.enum';

@Entity('workorders')
export class WorkOrderEntity extends BaseEntity {
  @Column('uuid', { name: 'userid' })
  userId: string;

  @ManyToOne(() => UserEntity)
  @JoinColumn({ name: 'userid' })
  user: UserEntity;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  status: WorkOrderStatus;

  @OneToMany(() => CommentEnity, (comment: CommentEnity) => comment.workOrder, {
    cascade: ['insert'],
  })
  @JoinColumn({ name: 'id' })
  comment: CommentEnity;

  @CreateDateColumn({ name: 'startdate', type: 'timestamp with time zone' })
  startDate = getUTCDate();

  @CreateDateColumn({
    name: 'enddate',
    type: 'timestamp with time zone',
    nullable: true,
  })
  endDate: Date;
}
