import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserResponseDto {
  @Expose()
  @ApiProperty({ example: '47eed230-5a2d-4b3a-a3fc-4f049a595a5d' })
  id: string;

  @Expose()
  @ApiProperty({ example: 'johndoe@sof.to' })
  email: string;
}
