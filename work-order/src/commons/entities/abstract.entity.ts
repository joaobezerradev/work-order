import { BaseEntity as TypeOrmBaseEntity, PrimaryColumn } from 'typeorm';

import { v4 as uuid } from 'uuid';

export abstract class BaseEntity extends TypeOrmBaseEntity {
  @PrimaryColumn('uuid', { primary: true, name: 'id' })
  id: string = uuid();
}
