import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dtos/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
  ) {}

  async findById(id: string): Promise<UserEntity> {
    return this.userRepository.findById(id);
  }

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.findAll();
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ where: { email } });
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { email, password } = createUserDto;

    const foundUser = await this.userRepository.findByEmail(email);

    if (foundUser) {
      throw new ConflictException('User already exists.');
    }

    const passwordHash = this.hashPassword(password);

    const newUser = this.userRepository.create({
      email,
      password: passwordHash,
    });

    await newUser.save();

    return newUser;
  }

  async findBySecurityStamp(
    id: string,
    securityStamp: string,
  ): Promise<UserEntity> {
    return this.userRepository.findBySecurityStamp(id, securityStamp);
  }

  async resetPassword(
    userData: Partial<UserEntity>,
    newPassword: string,
  ): Promise<UserEntity> {
    const securityStamp = uuid();
    const passwordHash = this.hashPassword(newPassword);

    const updatedUser = { ...userData, passwordHash, securityStamp };

    return this.userRepository.save(updatedUser);
  }

  private hashPassword(password: string): string {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
  }
}
