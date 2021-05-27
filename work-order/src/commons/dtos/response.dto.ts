import { ApiProperty } from '@nestjs/swagger';
import { Body } from './body.dto';

export class ResponseDocs {
  @ApiProperty({ example: '200' })
  statusCode: number;

  @ApiProperty()
  body: Body;
}
