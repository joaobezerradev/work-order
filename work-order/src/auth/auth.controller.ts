import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';

import { ApiDefaultResponse } from '../commons/decorators/api-response';
import { ResponseDocs } from '../commons/dtos/response.dto';

import { AuthService } from './auth.service';

import { SignInParamsDto } from './dtos/signin-params.dto';
import { SignInResponseDto } from './dtos/signin-response.dto';
import { SignUpParamsDto } from './dtos/signup-params.dto';

@ApiTags('auth')
@Controller('auth')
@ApiExtraModels(ResponseDocs, SignInResponseDto)
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiDefaultResponse()
  signUp(
    @Body(ValidationPipe) signUpCredentialsDto: SignUpParamsDto,
  ): Promise<void> {
    return this.authService.signUp(signUpCredentialsDto);
  }

  @Post('/signin')
  @ApiDefaultResponse(SignInResponseDto)
  async signIn(
    @Body(ValidationPipe) authCredentialsDto: SignInParamsDto,
  ): Promise<SignInResponseDto> {
    const authenticatedUser = await this.authService.signIn(authCredentialsDto);
    return SignInResponseDto.factory(authenticatedUser);
  }
}
