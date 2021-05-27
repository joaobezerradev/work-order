import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEnum } from 'class-validator';
import { WorkOrderStatusEnum } from '../enums/work-order-status.enum';

export class UpdateWorkOrderDto {
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(WorkOrderStatusEnum)
  status: WorkOrderStatusEnum;
}
