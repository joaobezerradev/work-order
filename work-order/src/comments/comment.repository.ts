import { EntityRepository, Repository } from 'typeorm';
import { CommentEnity } from './comment.entity';

@EntityRepository(CommentEnity)
export class CommentRepository extends Repository<CommentEnity> {}
