import { Injectable, NotFoundException } from '@nestjs/common';
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
}
