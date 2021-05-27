import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class BaseDto {
  @Expose()
  id: string;

  alternativeid: number;

  createddate: Date;

  updateddate?: Date;

  deleteddate?: Date;
}
