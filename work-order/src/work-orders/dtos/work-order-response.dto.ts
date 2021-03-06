import { classToClass, Expose, plainToClass } from 'class-transformer';
import { BaseDto } from 'src/commons/dtos/base.dto';
import { WorkOrderStatus } from '../enums/work-order-status.enum';
import { WorkOrderEntity } from '../work-order.entity';

export class WorkOrderResponseDto extends BaseDto {
  @Expose()
  userId: string;

  @Expose()
  description: string;

  @Expose()
  price: number;

  @Expose()
  status: WorkOrderStatus;

  @Expose()
  startDate: Date;

  @Expose()
  endDate: Date | null;

  static factory(workOrder: WorkOrderEntity): WorkOrderResponseDto {
    const responseData = plainToClass(WorkOrderResponseDto, workOrder, {
      ignoreDecorators: true,
    });

    return classToClass(responseData, { excludeExtraneousValues: true });
  }

  static factoryMap(workOrders: WorkOrderEntity[]): WorkOrderResponseDto[] {
    return workOrders.map((workOrder) => this.factory(workOrder));
  }
}
