import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async findById(id: string): Promise<UserEntity> {
    const found = await this.userRepository.findOne(id);

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  async findByEmail(email: string): Promise<UserEntity> {
    const found = await this.userRepository.findOne({ where: { email } });

    if (!found) {
      throw new NotFoundException();
    }

    return found;
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { email, password } = createUserDto;

    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(password, salt);

    const newUser = this.userRepository.create({
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return newUser;
  }
}
