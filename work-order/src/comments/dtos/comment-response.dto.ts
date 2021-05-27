import { CommentEnity } from '../comment.entity';
import { plainToClass, classToClass, Expose } from 'class-transformer';
import { BaseDto } from '../../commons/dtos/base.dto';

export class CommentResponseDto extends BaseDto {
  @Expose()
  description: string;

  @Expose()
  sendDate: Date;

  public static factory(comment: CommentEnity): CommentResponseDto {
    const responseData = plainToClass(this, comment, {
      ignoreDecorators: true,
    });

    return classToClass(responseData, { excludeExtraneousValues: true });
  }
}
