/* eslint-disable @typescript-eslint/no-explicit-any */
import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';
import { ResponseDocs } from '../dtos/response.dto';

export const ApiDefaultResponse = <TModel extends Type<any>>(
  model?: TModel,
) => {
  const data = model ? { $ref: getSchemaPath(model) } : undefined;

  return applyDecorators(
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(ResponseDocs) },
          {
            properties: {
              body: {
                properties: {
                  data,
                },
              },
            },
          },
        ],
      },
    }),
  );
};
