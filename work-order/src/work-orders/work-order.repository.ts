import { EntityRepository, Repository } from 'typeorm';
import { WorkOrderEntity } from './work-order.entity';

@EntityRepository(WorkOrderEntity)
export class WorkOrderRepository extends Repository<WorkOrderEntity> {}
