import { applyDecorators, Get, HttpCode, HttpStatus } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger';
import { capitalize } from 'lodash';

export function ApiFindOne(name: string, type: Function) {
  return applyDecorators(
    ApiParam({ name: 'id', type: Number, example: 1 }),
    ApiOkResponse({
      description: `Get ${name} success`,
      type: type,
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
    ApiBadRequestResponse({
      description: 'Bad Request',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'string', example: 400 },
          message: {
            type: 'string',
            example: 'Validation failed (numeric string is expected)',
          },
          error: { type: 'string', example: 'Bad Request' },
        },
      },
    }),
    Get(':id'),
    HttpCode(HttpStatus.OK),
  );
}
