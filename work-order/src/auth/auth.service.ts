/* eslint-disable prettier/prettier */
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { UserEntity } from '../users/user.entity';
import { SignInParamsDto } from './dtos/signin-params.dto';
import { SignUpParamsDto } from './dtos/signup-params.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { IToken } from './interfaces/token.interface';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  public async signUp(signUpParamsDto: SignUpParamsDto): Promise<void> {
    await this.userService.createUser(signUpParamsDto);
  }

  public async signIn({ email, password }: SignInParamsDto): Promise<IToken> {
    const foundUser = await this.userService.findByEmail(email);

    if (!foundUser) {
      throw new NotFoundException('User not found.');
    }

    const isValid = this.validatePassword({
      passwordHash: foundUser.password,
      password,
    });

    if (!isValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return this.generateToken(foundUser);
  }

  private validatePassword({ passwordHash, password }): boolean {
    return bcrypt.compareSync(password, passwordHash);
  }

  private generateToken(user: UserEntity): IToken {
    const refreshTokenExpiresIn =
      process.env.JWT_SECRET_REFRESHTOKEN_EXPIRES_IN;
    const secretRefreshToken = process.env.JWT_SECRET_REFRESHTOKEN;

    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
    };

    const accessToken = this.jwtService.sign(payload);

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: refreshTokenExpiresIn,
      secret: secretRefreshToken,
    });

    return {
      accessToken,
      refreshToken,
      user,
    };
  }
}
