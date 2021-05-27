import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersService } from 'src/users/users.service';
import { CreateWorkOrderDto } from './dtos/create-work-order.dto';
import { WorkOrderEntity } from './work-order.entity';
import { WorkOrderRepository } from './work-order.repository';

@Injectable()
export class WorkOrdersService {
  constructor(
    @InjectRepository(WorkOrderRepository)
    private workOrderRepository: WorkOrderRepository,
    private usersService: UsersService,
  ) {}

  async getWorkOrders(): Promise<WorkOrderEntity[]> {
    return this.workOrderRepository.find();
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
      endDate: null,
    });

    await newWorkOrder.save();

    return newWorkOrder;
  }
}
