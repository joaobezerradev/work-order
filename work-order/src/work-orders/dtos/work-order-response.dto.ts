import { classToClass, Expose, plainToClass } from 'class-transformer';
import { BaseDto } from 'src/commons/dtos/base.dto';
import { WorkOrderStatusEnum } from '../enums/work-order-status.enum';
import { WorkOrderEntity } from '../work-order.entity';

export class WorkOrderResponseDto extends BaseDto {
  @Expose()
  userId: string;

  @Expose()
  description: string;

  @Expose()
  price: number;

  @Expose()
  status: WorkOrderStatusEnum;

  @Expose()
  startDate: Date;

  @Expose()
  endDate: Date | null;

  static factory(workOrder: WorkOrderEntity): WorkOrderResponseDto {
    const responseData = plainToClass(this, workOrder, {
      ignoreDecorators: true,
    });

    return classToClass(responseData, { excludeExtraneousValues: true });
  }

  static factoryMap(workOrders: WorkOrderEntity[]): WorkOrderResponseDto[] {
    return workOrders.map((workOrder) => this.factory(workOrder));
  }
}
