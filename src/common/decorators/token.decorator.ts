import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { getTokenFromHeader } from "src/common/utils";

export const TokenFromRequest = createParamDecorator((data: string, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return getTokenFromHeader(request, data);
});
