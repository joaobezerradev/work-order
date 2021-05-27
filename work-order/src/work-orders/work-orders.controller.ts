import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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

  @Get('/:id')
  async getWorkOrderById(
    @Param('id') id: string,
  ): Promise<WorkOrderResponseDto> {
    const workOrder = await this.workOrdersService.getWorkOrderById(id);
    return WorkOrderResponseDto.factory(workOrder);
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

  @Put('/:id')
  async finalizeWorkOrder(
    @Param('id') id: string,
  ): Promise<WorkOrderResponseDto> {
    const updatedWorkOrder = await this.workOrdersService.finalizeWorkOrder(id);
    return WorkOrderResponseDto.factory(updatedWorkOrder);
  }
}
