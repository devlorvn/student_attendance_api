import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { getTokenFromHeader } from '@app/common/utils';

export const TokenFromRequest = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return getTokenFromHeader(request);
  },
);