/* eslint-disable @typescript-eslint/no-explicit-any */
import { applyDecorators, Type } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiResponseOptions,
  getSchemaPath,
} from '@nestjs/swagger';
import { ResponseDocs } from '../dtos/response.dto';

export const ApiPaginatedResponse = <TModel extends Type<any>>(
  model?: TModel,
) => {
  const options: ApiResponseOptions = {
    schema: {
      allOf: [
        { $ref: getSchemaPath(ResponseDocs) },
        {
          properties: {
            body: {
              properties: {
                data: { $ref: getSchemaPath(model) },
              },
            },
          },
        },
      ],
    },
  };

  return applyDecorators(ApiOkResponse(options));
};
