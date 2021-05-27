import {
  BaseEntity as TypeOrmBaseEntity,
  CreateDateColumn,
  DeleteDateColumn,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

import { v4 as uuid } from 'uuid';
import { getUTCDate } from '../functions/get-utc-date.function';

export abstract class BaseEntity extends TypeOrmBaseEntity {
  @PrimaryColumn('uuid', { primary: true, name: 'id' })
  id: string = uuid();

  @CreateDateColumn({ name: 'createddate', type: 'timestamp with time zone' })
  createdDate = getUTCDate();

  @UpdateDateColumn({
    name: 'updateddate',
    nullable: true,
    type: 'timestamp with time zone',
  })
  updatedDate?: Date;

  @DeleteDateColumn({
    name: 'deleteddate',
    nullable: true,
    type: 'timestamp with time zone',
  })
  deletedDate?: Date;
}
