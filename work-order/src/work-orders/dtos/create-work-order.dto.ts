import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  MinLength,
} from 'class-validator';

export class CreateWorkOrderDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @ApiProperty({ type: String, example: 'Lorem ipsum et' })
  description: string;

  @IsUUID('4')
  @ApiProperty({
    type: String,
    example: 'b985238f-1db1-476b-8f85-0a0f68707e8f',
  })
  userId: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number, example: 4 })
  price: number;
}
