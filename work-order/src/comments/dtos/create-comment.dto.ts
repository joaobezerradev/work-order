import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID, MinLength } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty()
  @ApiProperty({
    type: String,
    example: '69873f28-b0e3-414e-b83d-b45d61f50fa1',
  })
  @IsNotEmpty()
  @IsUUID()
  workOrderId: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  description: string;
}
