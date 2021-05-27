import { UserEntity } from '../../users/user.entity';

export interface IToken {
  accessToken?: string;
  refreshToken?: string;
  user: UserEntity;
}
