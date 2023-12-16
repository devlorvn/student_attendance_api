import { applyDecorators, HttpCode, HttpStatus, Post } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiCreatedResponse, ApiInternalServerErrorResponse } from "@nestjs/swagger";

export function ApiCreate(name: string, type: Function) {
  return applyDecorators(
    ApiBody({ type: type }),
    ApiCreatedResponse({
      description: `Tạo mới ${name} thành công.`,
      schema: {
        type: "object",
        properties: {
          status: { type: "string", example: "ok" },
          message: { type: "string", example: "success" },
        },
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
    ApiBadRequestResponse({
      description: "Dữ liệu không hợp lệ",
      schema: {
        type: "object",
        properties: {
          status: { type: "string", example: "error" },
          message: { type: "string", example: "Dữ liệu không hợp lệ" },
        },
      },
    }),
    HttpCode(HttpStatus.OK),
    Post()
  );
}
