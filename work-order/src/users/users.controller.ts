import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { UsersService } from './users.service';

import { CreateUserDto } from './dtos/create-user.dto';
import { UserResponseDto } from './dtos/user-response.dto';

@ApiTags('users')
@Controller('users')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get()
  @ApiOkResponse({ description: 'List all users' })
  @ApiUnauthorizedResponse()
  async getUsers(): Promise<UserResponseDto[]> {
    const users = await this.usersService.findAll();
    return UserResponseDto.factoryMap(users);
  }

  @Get('/:id')
  @ApiOkResponse({ description: 'Show user by id' })
  @ApiUnauthorizedResponse()
  async getUserById(
    @Param('id', ValidationPipe) id: string,
  ): Promise<UserResponseDto> {
    const user = await this.usersService.findById(id);
    return UserResponseDto.factory(user);
  }

  @Post()
  @ApiOkResponse({ description: 'Created user' })
  @ApiUnauthorizedResponse()
  async createUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<UserResponseDto> {
    const createdUser = await this.usersService.createUser(createUserDto);
    return UserResponseDto.factory(createdUser);
  }
}
