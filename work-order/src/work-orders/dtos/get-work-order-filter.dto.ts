import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { WorkOrderStatus } from '../enums/work-order-status.enum';

export class GetWorkOrderFilterDto {
  @IsOptional()
  @IsEnum(WorkOrderStatus)
  @ApiPropertyOptional()
  status?: WorkOrderStatus;

  @IsOptional()
  @IsString()
  @ApiPropertyOptional()
  search?: string;
}
