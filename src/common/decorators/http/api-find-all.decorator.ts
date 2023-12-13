import { applyDecorators, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOkResponse } from '@nestjs/swagger';

export function ApiFindAll(name: string, type: Function) {
  return applyDecorators(
    ApiOkResponse({
      description: `Get list ${name} success`,
      type: [type],
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
    HttpCode(HttpStatus.OK),
    Get(),
  );
}
