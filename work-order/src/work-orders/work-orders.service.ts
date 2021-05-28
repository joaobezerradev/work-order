import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { CreateWorkOrderDto } from './dtos/create-work-order.dto';
import { GetWorkOrderFilterDto } from './dtos/get-work-order-filter.dto';
import { WorkOrderStatus } from './enums/work-order-status.enum';
import { WorkOrderEntity } from './work-order.entity';
import { WorkOrderRepository } from './work-order.repository';

@Injectable()
export class WorkOrdersService {
  constructor(
    @InjectRepository(WorkOrderRepository)
    private workOrderRepository: WorkOrderRepository,
    private usersService: UsersService,
  ) {}

  async getWorkOrders(
    getWorkOrderFilterDto: GetWorkOrderFilterDto,
  ): Promise<WorkOrderEntity[]> {
    return this.workOrderRepository.getWorkOrders(getWorkOrderFilterDto);
  }
  async getWorkOrderById(id: string): Promise<WorkOrderEntity> {
    return this.workOrderRepository.findOne(id);
  }

  async createWorkOrder(
    createWorkOrderDto: CreateWorkOrderDto,
  ): Promise<WorkOrderEntity> {
    const { userId, description, price } = createWorkOrderDto;

    const foundUser = await this.usersService.findById(userId);

    if (!foundUser) {
      throw new NotFoundException();
    }

    const newWorkOrder = this.workOrderRepository.create({
      userId,
      description,
      price,
      status: WorkOrderStatus.OPEN,
      endDate: null,
    });

    await newWorkOrder.save();

    return newWorkOrder;
  }

  private updateWorkOrder(
    updateWorkOrder: Partial<WorkOrderEntity>,
  ): Promise<WorkOrderEntity> {
    return this.workOrderRepository.save(updateWorkOrder);
  }

  async finalizeWorkOrder(id: string): Promise<WorkOrderEntity> {
    const foundWorkOrder = await this.getWorkOrderById(id);

    if (!foundWorkOrder) {
      throw new NotFoundException();
    }

    foundWorkOrder.status = WorkOrderStatus.FINISHED;

    return this.updateWorkOrder(foundWorkOrder);
  }
}
