import { Body, Controller, Post } from '@nestjs/common';
import { CreateWorkOrderDto } from './dtos/create-work-order.dto';
import { WorkOrderResponseDto } from './dtos/work-order-response.dto';
import { WorkOrdersService } from './work-orders.service';

@Controller('work-orders')
export class WorkOrdersController {
  constructor(private workOrdersService: WorkOrdersService) {}

  @Post()
  async createWorkOrder(
    @Body() createWorkOrderDto: CreateWorkOrderDto,
  ): Promise<WorkOrderResponseDto> {
    const createdWorkOrder = await this.workOrdersService.createWorkOrder(
      createWorkOrderDto,
    );

    return WorkOrderResponseDto.factory(createdWorkOrder);
  }
}
