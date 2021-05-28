import { v4 as uuid } from 'uuid';
import { EntityRepository, Repository } from 'typeorm';

import { UserEntity } from './user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {}
