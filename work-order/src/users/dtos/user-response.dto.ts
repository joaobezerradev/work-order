import { classToClass, Expose, plainToClass } from 'class-transformer';
import { BaseDto } from '../../commons/dtos/base.dto';
import { UserEntity } from '../user.entity';

export class UserResponseDto extends BaseDto {
  @Expose()
  email: string;

  static factory(user: UserEntity): UserResponseDto {
    const responseData = plainToClass(UserResponseDto, user, {
      ignoreDecorators: true,
    });

    return classToClass(responseData, { excludeExtraneousValues: true });
  }

  static factoryMap(users: UserEntity[]): UserResponseDto[] {
    return users.map((user) => this.factory(user));
  }
}
