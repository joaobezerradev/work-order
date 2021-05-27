import { IsEnum, IsOptional, IsString } from 'class-validator';
import { WorkOrderStatus } from '../enums/work-order-status.enum';

export class GetWorkOrderFilterDto {
  @IsOptional()
  @IsEnum(WorkOrderStatus)
  status?: WorkOrderStatus;

  @IsOptional()
  @IsString()
  search?: string;
}
