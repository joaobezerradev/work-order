import { ApiProperty } from '@nestjs/swagger';
import {
  MinLength,
  IsString,
  MaxLength,
  Matches,
  IsNotEmpty,
  IsEmail,
} from 'class-validator';

export class SignInParamsDto {
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @MaxLength(150)
  @ApiProperty({ type: String, example: 'johndoe@sof.to' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  @ApiProperty({ type: String, example: 'Pa$$word123' })
  password: string;
}
