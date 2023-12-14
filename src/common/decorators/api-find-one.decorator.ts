import { applyDecorators, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam } from "@nestjs/swagger";
import { capitalize } from "lodash";

export function ApiFindOne(name: string, type: Function) {
  return applyDecorators(
    ApiParam({ name: "id", type: Number, example: 1 }),
    ApiOkResponse({
      description: `Lấy ${name} thành công`,
      type: type,
    }),
    ApiNotFoundResponse({
      description: `${capitalize(name)} không tồn tại`,
      schema: {
        type: "object",
        properties: {
          status: { type: "string", example: "error" },
          message: {
            type: "string",
            example: `Tài nguyên ${capitalize(name)} không tồn tại`,
          },
          errorCode: { type: "string", example: "-1" },
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
    Get(":id"),
    HttpCode(HttpStatus.OK)
  );
}
