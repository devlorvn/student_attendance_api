import { applyDecorators, Patch } from "@nestjs/common";
import { ApiBadRequestResponse, ApiBody, ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam } from "@nestjs/swagger";
import { capitalize } from "lodash";

export function ApiUpdate(name: string, type: Function) {
  return applyDecorators(
    ApiParam({ name: "id", type: Number, example: 1 }),
    ApiBody({ type: type }),
    ApiOkResponse({
      description: `Cập nhật tài nguyên thành công.`,
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

    Patch(":id")
  );
}
