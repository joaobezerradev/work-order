import { v4 as uuid } from 'uuid';
import { EntityRepository, Repository } from 'typeorm';

import { UserEntity } from './user.entity';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  public async findByEmail(email: string): Promise<UserEntity> {
    return this.findOne({ where: { email } });
  }

  public async findById(id: string): Promise<UserEntity> {
    return this.findOne(id);
  }

  public async findBySecurityStamp(
    id: string,
    securityStamp: string,
  ): Promise<UserEntity> {
    return this.findOne({
      where: {
        id,
        securityStamp,
      },
    });
  }

  public async createUser(
    createUser: Partial<UserEntity>,
  ): Promise<UserEntity> {
    return this.save({
      ...createUser,
      id: uuid(),
    });
  }

  public async findAll(): Promise<UserEntity[]> {
    return this.find();
  }
}
