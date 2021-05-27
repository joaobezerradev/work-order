import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateWorkOrderDto } from './dtos/create-work-order.dto';
import { WorkOrderResponseDto } from './dtos/work-order-response.dto';
import { WorkOrdersService } from './work-orders.service';

@Controller('work-orders')
export class WorkOrdersController {
  constructor(private workOrdersService: WorkOrdersService) {}

  @Get()
  async getWorkOrders(): Promise<WorkOrderResponseDto[]> {
    const workOrders = await this.workOrdersService.getWorkOrders();
    return WorkOrderResponseDto.factoryMap(workOrders);
  }

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
