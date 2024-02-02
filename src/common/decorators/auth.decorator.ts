import { applyDecorators, SetMetadata, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiUnauthorizedResponse } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/guards/app/jwtAuth.guard";
export interface IPermissionScope {
  action: string;
  subject: string;
}

export function Auth(permission?: IPermissionScope) {
  return applyDecorators(
    SetMetadata("permission", permission),
    UseGuards(JwtAuthGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({
      description: "Unauthorized",
      schema: {
        type: "object",
        properties: {
          statusCode: { type: "number", example: 401 },
          message: { type: "string", example: "Unauthorized" },
        },
      },
    })
  );
}
