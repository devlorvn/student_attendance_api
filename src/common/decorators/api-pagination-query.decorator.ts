import { applyDecorators } from "@nestjs/common";
import { ApiExtraModels, ApiQuery, getSchemaPath } from "@nestjs/swagger";

export function ApiPaginationQuery(paginationDto: Function) {
  return applyDecorators(
    ApiExtraModels(paginationDto),
    ApiQuery({
      required: false,
      name: "pagination",
      style: "deepObject",
      explode: true,
      type: "object",
      schema: {
        $ref: getSchemaPath(paginationDto),
      },
      example: {
        pageSize: 100,
        page: 1,
        orderBy: {
          createdAt: "asc",
        },
      },
    })
  );
}
