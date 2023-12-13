import { applyDecorators, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger';
import { capitalize } from 'lodash';

export function ApiDelete(name: string) {
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    Delete(':id'),
    ApiParam({ name: 'id', type: Number, example: 1 }),
    ApiOkResponse({
      description: `Remove  ${name} success`,
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: `This action removes a #id  ${name}`,
          },
        },
      },
    }),
    ApiInternalServerErrorResponse({
      description: 'Lỗi máy chủ server',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 500 },
          message: { type: 'string', example: 'Lỗi máy chủ server' },
        },
      },
    }),
    ApiNotFoundResponse({
      description: `${capitalize(name)} not found`,
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 404 },
          message: {
            type: 'string',
            example: `${capitalize(name)} #id not found`,
          },
          error: { type: 'string', example: 'Not Found' },
        },
      },
    }),
  );
}
