import { EntityRepository, Repository } from 'typeorm';
import { GetWorkOrderFilterDto } from './dtos/get-work-order-filter.dto';
import { WorkOrderEntity } from './work-order.entity';

@EntityRepository(WorkOrderEntity)
export class WorkOrderRepository extends Repository<WorkOrderEntity> {
  async getWorkOrders(
    filterDto: GetWorkOrderFilterDto,
  ): Promise<WorkOrderEntity[]> {
    const { status, search } = filterDto;

    const query = this.createQueryBuilder('workorders').leftJoinAndSelect(
      'workorders.comment',
      'comment',
    );

    if (status) {
      query.andWhere('workorders.status = :status', { status });
    }

    if (search) {
      query.andWhere('LOWER(workorders.description) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    return query.getMany();
  }
}
