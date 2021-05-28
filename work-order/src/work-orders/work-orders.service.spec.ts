import { Test } from '@nestjs/testing';
import { UserRepository } from '../users/user.repository';
import { UsersService } from '../users/users.service';
import { WorkOrderStatus } from './enums/work-order-status.enum';
import { WorkOrderRepository } from './work-order.repository';
import { WorkOrdersService } from './work-orders.service';

const mockWorkOrderRepository = () => ({
  getWorkOrders: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});

const mockUsersService = () => ({
  findById: jest.fn(),
});

const mockWorkOrder = {
  id: 'a76b03c8-0ccf-4548-a2ee-f5f0dfd90cd8',
  userId: '1758b3c8-4cb7-4dc8-b658-53e32e904964',
  decription: 'Lorem ipsum',
  price: 400,
  status: WorkOrderStatus.OPEN,
  startDate: new Date(),
  endDate: null,
};

const mockUser = {
  email: 'johndoe@sof.to',
  password: 'Pa$$word123',
};

describe('WorkOrdersService', () => {
  let usersService;
  let workOrdersService;
  let workOrderRepository;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [
        WorkOrdersService,
        { provide: WorkOrderRepository, useFactory: mockWorkOrderRepository },
        { provide: UsersService, useFactory: mockUsersService },
      ],
    }).compile();

    workOrdersService = module.get<WorkOrdersService>(WorkOrdersService);
    workOrderRepository = module.get<WorkOrderRepository>(WorkOrderRepository);

    usersService = module.get<UsersService>(UsersService);
  });

  describe('getWorkOrders', () => {
    it('calls WorkOrderRepository.getWorkOrders and returns the result.', async () => {
      workOrderRepository.getWorkOrders.mockResolvedValue('someValue');
      const result = await workOrdersService.getWorkOrders({
        search: null,
        status: null,
      });
      expect(result).toEqual('someValue');
    });
  });

  describe('getWorkOrderById', () => {
    it('calls WorkOrderRepository.findOne and return the result.', async () => {
      workOrderRepository.findOne.mockResolvedValue('someValue');
      const result = await workOrdersService.getWorkOrderById('validId');
      expect(result).toEqual('someValue');
    });
  });

  describe('createWorkOrder', () => {
    it('calls WorkOrderRepository.create and return the result', async () => {
      usersService.findById.mockResolvedValue(mockUser);
      workOrderRepository.save.mockResolvedValue(mockWorkOrder);
      const result = await workOrdersService.createWorkOrder({
        description: 'Lorem',
        price: 4,
        userId: 'validId',
      });

      expect(result).toEqual(mockWorkOrder);
    });
  });
});
