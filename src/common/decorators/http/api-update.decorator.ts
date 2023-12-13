import { applyDecorators, Patch } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBody,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
} from '@nestjs/swagger';
import { capitalize } from 'lodash';

export function ApiUpdate(name: string, type: Function) {
  return applyDecorators(
    ApiParam({ name: 'id', type: Number, example: 1 }),
    ApiBody({ type: type }),
    ApiOkResponse({
      description: `Update ${name} success`,
      schema: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            example: `This action updates a #id ${name}`,
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
    ApiConflictResponse({
      description: 'Conflict error',
      schema: {
        type: 'object',
        properties: {
          code: { type: 'string', example: 'P2002' },
          clientVersion: { type: 'string', example: '4.14.1' },
          meta: {
            type: 'object',
            properties: {
              target: {
                type: 'string',
                example: `${name.replace(/ /g, '_')}_code_key`,
              },
            },
          },
          message: { type: 'string', example: 'Xuất hiện xung đột dữ liệu' },
        },
      },
    }),
    Patch(':id'),
  );
}
