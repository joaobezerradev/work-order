export interface IResponse<T> {
  statusCode: number;
  body: {
    status: string;
    data: T;
  };
}
