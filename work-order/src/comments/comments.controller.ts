import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ApiDefaultResponse } from 'src/commons/decorators/api-response';
import { CommentEnity } from './comment.entity';
import { CommentsService } from './comments.service';
import { CommentResponseDto } from './dtos/comment-response.dto';
import { CreateCommentDto } from './dtos/create-comment.dto';

@ApiTags('comments')
@Controller('comments/:workOrderId/comments')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
export class CommentsController {
  constructor(private commentsService: CommentsService) {}

  @Get()
  @ApiDefaultResponse(CommentResponseDto)
  async getCommentById(
    @Param('workOrderId', new ParseUUIDPipe()) workOrderId: string,
  ): Promise<CommentEnity[]> {
    const foundComments = await this.commentsService.getCommentsByWorkOrderId(
      workOrderId,
    );

    return foundComments;
  }

  @Post()
  @ApiDefaultResponse(CommentResponseDto)
  async createComment(
    @Body(ValidationPipe)
    createCommentDto: CreateCommentDto,
  ): Promise<CommentResponseDto> {
    const createdComment = await this.commentsService.createComment(
      createCommentDto,
    );
    return CommentResponseDto.factory(createdComment);
  }
}
