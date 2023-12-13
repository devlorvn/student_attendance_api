import {
  applyDecorators,
  Get,
  HttpCode,
  HttpStatus,
  Type,
} from '@nestjs/common';
import {
  ApiExtraModels,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  getSchemaPath,
} from '@nestjs/swagger';
import { PaginatedResponseDto } from '@app/common/dto';

export const ApiFindAllPaginated = <DataDto extends Type<unknown>>(
  dataDto: DataDto,
) =>
  applyDecorators(
    ApiExtraModels(PaginatedResponseDto, dataDto),
    ApiOkResponse({
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedResponseDto) },
          {
            properties: {
              data: {
                type: 'array',
                items: { $ref: getSchemaPath(dataDto) },
              },
            },
          },
        ],
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
    HttpCode(HttpStatus.OK),
    Get(),
  );
