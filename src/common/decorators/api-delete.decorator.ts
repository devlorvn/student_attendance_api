import { applyDecorators, Delete, HttpCode, HttpStatus } from "@nestjs/common";
import { ApiInternalServerErrorResponse, ApiNotFoundResponse, ApiOkResponse, ApiParam } from "@nestjs/swagger";
import { capitalize } from "lodash";
import { UUID } from "typeorm/driver/mongodb/bson.typings";

export function ApiDelete(name: string) {
  return applyDecorators(
    HttpCode(HttpStatus.OK),
    Delete(":id"),
    ApiParam({
      name: "id",
      type: UUID,
      example: "4607421b-f16b-45b6-9c47-be87f8c203b8",
    }),
    ApiOkResponse({
      description: `Xóa tài nguyên thành công.`,
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
    })
  );
}
