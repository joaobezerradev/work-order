import { Injectable, NotFoundException } from '@nestjs/common';
import { WorkOrderStatus } from 'src/work-orders/enums/work-order-status.enum';
import { WorkOrderEntity } from 'src/work-orders/work-order.entity';
import { WorkOrdersService } from 'src/work-orders/work-orders.service';
import { CommentEnity } from './comment.entity';
import { CommentRepository } from './comment.repository';
import { CreateCommentDto } from './dtos/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    private commentRepository: CommentRepository,
    private workOrdersService: WorkOrdersService,
  ) {}

  async getCommentsByWorkOrderId(workOrderId: string): Promise<CommentEnity[]> {
    const foundWorkOrder = await this.workOrdersService.getWorkOrderById(
      workOrderId,
    );

    if (!foundWorkOrder) {
      throw new NotFoundException();
    }

    const comments = await this.commentRepository.find({
      where: { workOrderId },
      relations: ['workOrder'],
    });

    return comments;
  }

  async createComment(
    createCommentDto: CreateCommentDto,
  ): Promise<CommentEnity> {
    const { workOrderId, description } = createCommentDto;

    const foundWorkOrder = await this.workOrdersService.getWorkOrderById(
      workOrderId,
    );

    if (!foundWorkOrder) {
      throw new NotFoundException();
    }

    const newComment = this.commentRepository.create({
      workOrderId,
      description,
    });

    await newComment.save();

    return newComment;
  }

  async createCommentTest(): Promise<CommentEnity> {
    const newWorkOrder = new WorkOrderEntity();
    newWorkOrder.description = 'description';
    newWorkOrder.userId = '1758b3c8-4cb7-4dc8-b658-53e32e904964';
    newWorkOrder.price = 4;
    newWorkOrder.status = WorkOrderStatus.CANCELED;
    newWorkOrder.endDate = null;

    const newComment = this.commentRepository.create({
      workOrder: newWorkOrder,
      description: 'description',
    });

    await newComment.save();

    return newComment;
  }
}
