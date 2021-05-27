import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { WorkOrderStatus } from '../enums/work-order-status.enum';

export class UpdateWorkOrderDto {
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(WorkOrderStatus)
  status: WorkOrderStatus;
}
