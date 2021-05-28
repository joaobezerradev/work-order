import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from './comment.repository';
import { WorkOrdersModule } from 'src/work-orders/work-orders.module';

@Module({
  imports: [TypeOrmModule.forFeature([CommentRepository]), WorkOrdersModule],
  providers: [CommentsService],
  controllers: [CommentsController],
  exports: [CommentsService],
})
export class CommentsModule {}
