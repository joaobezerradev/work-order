import { DbType } from '../enums/db-type.enum';

export interface DbConfig {
  type: DbType;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  synchronize: boolean;
}
