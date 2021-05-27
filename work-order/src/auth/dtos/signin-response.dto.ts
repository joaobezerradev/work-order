import { ApiProperty } from '@nestjs/swagger';
import { classToClass, Expose, plainToClass, Type } from 'class-transformer';

import { IToken } from '../interfaces/token.interface';
import { UserResponseDto } from './signin-user-response.dto';

const tokenExample =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjFkN2IwNTRiLTJkNzgtNGYxNi1hNzJkLTNlYWUyOGMxZGVhYSIsImVtYWlsIjoiYWRtaW5Ac29mLnRvIiwidGVuYW50SWQiOiJiOTg1MjM4Zi0xZGIxLTQ3NmItOGY4NS0wYTBmNjg3MDdlOGYiLCJpYXQiOjE2MTQzOTY5MjcsImV4cCI6MTYxNDQwMDUyN30.VQ53cLZeV6MLK8bruH7GqxG1loa7V0YhHiR8wj3hR-w';

export class SignInResponseDto {
  @Expose()
  @ApiProperty({ example: tokenExample })
  accessToken: string;

  @Expose()
  @ApiProperty({ example: tokenExample })
  refreshToken: string;

  @Expose()
  @ApiProperty()
  @Type(() => UserResponseDto)
  user: UserResponseDto;

  public static factory(resultQuery: IToken): SignInResponseDto {
    const resultQueryDto = plainToClass(SignInResponseDto, resultQuery, {
      excludeExtraneousValues: true,
    });

    return classToClass(resultQueryDto);
  }
}
