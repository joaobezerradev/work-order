import { ApiProperty } from '@nestjs/swagger';

export class Body {
  @ApiProperty({ example: 'success' })
  status: number;

  data?;
}
