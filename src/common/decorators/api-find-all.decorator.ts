import { applyDecorators, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiInternalServerErrorResponse, ApiOkResponse } from "@nestjs/swagger";

export function ApiFindAll(name: string, type: Function) {
  return applyDecorators(
    ApiOkResponse({
      description: `Lấy danh sách ${name} thành công`,
      type: [type],
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
}
