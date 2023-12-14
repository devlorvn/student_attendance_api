import { applyDecorators, Get, HttpCode, HttpStatus, Type } from "@nestjs/common";
import { ApiExtraModels, ApiInternalServerErrorResponse, ApiOkResponse, getSchemaPath } from "@nestjs/swagger";
import { PaginatedResponseDto } from "src/common/dtos";

export const ApiFindAllPaginated = <DataDto extends Type<unknown>>(dataDto: DataDto) =>
  applyDecorators(
    ApiExtraModels(PaginatedResponseDto, dataDto),
    ApiOkResponse({
      description: `Lấy danh sách thành công`,
      schema: {
        allOf: [
          { $ref: getSchemaPath(PaginatedResponseDto) },
          {
            properties: {
              data: {
                type: "array",
                items: { $ref: getSchemaPath(dataDto) },
              },
            },
          },
        ],
      },
    }),
    ApiInternalServerErrorResponse({
      description: "Lỗi máy chủ server",
      schema: {
        type: "object",
        properties: {
          status: { type: "string", example: "error" },
          message: { type: "string", example: "Lỗi máy chủ server" },
        },
      },
    }),
    HttpCode(HttpStatus.OK),
    Get()
  );
