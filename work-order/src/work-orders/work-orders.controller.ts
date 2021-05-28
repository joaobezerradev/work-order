import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiDefaultResponse } from 'src/commons/decorators/api-response';
import { CreateWorkOrderDto } from './dtos/create-work-order.dto';
import { GetWorkOrderFilterDto } from './dtos/get-work-order-filter.dto';
import { WorkOrderResponseDto } from './dtos/work-order-response.dto';
import { WorkOrdersService } from './work-orders.service';

@ApiTags('work-orders')
@Controller('work-orders')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class WorkOrdersController {
  constructor(private workOrdersService: WorkOrdersService) {}

  @Get()
  @ApiDefaultResponse(WorkOrderResponseDto)
  async getWorkOrders(
    @Query(ValidationPipe) getWorkOrderFilterDto: GetWorkOrderFilterDto,
  ) {
    const workOrders = await this.workOrdersService.getWorkOrders(
      getWorkOrderFilterDto,
    );
    return workOrders;
  }

  @Get('/:id')
  @ApiDefaultResponse(WorkOrderResponseDto)
  async getWorkOrderById(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<WorkOrderResponseDto> {
    const workOrder = await this.workOrdersService.getWorkOrderById(id);
    return WorkOrderResponseDto.factory(workOrder);
  }

  @Post()
  @ApiDefaultResponse(WorkOrderResponseDto)
  async createWorkOrder(
    @Body(ValidationPipe) createWorkOrderDto: CreateWorkOrderDto,
  ): Promise<WorkOrderResponseDto> {
    const createdWorkOrder = await this.workOrdersService.createWorkOrder(
      createWorkOrderDto,
    );
    return WorkOrderResponseDto.factory(createdWorkOrder);
  }

  @Put('/:id')
  @ApiDefaultResponse(WorkOrderResponseDto)
  async finalizeWorkOrder(
    @Param('id', new ParseUUIDPipe()) id: string,
  ): Promise<WorkOrderResponseDto> {
    const updatedWorkOrder = await this.workOrdersService.finalizeWorkOrder(id);
    return WorkOrderResponseDto.factory(updatedWorkOrder);
  }
}
