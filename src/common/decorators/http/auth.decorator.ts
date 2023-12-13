import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiUnauthorizedResponse } from '@nestjs/swagger';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { CASLGuard } from '../guards/user-role.guard';
import { RedisTokenGuard } from '../guards/redis.guard';

export interface IPermissionScope {
  action: string;
  subject: string;
}

export function Auth(permission?: IPermissionScope) {
  return applyDecorators(
    SetMetadata('permission', permission),
    UseGuards(JwtAuthGuard, RedisTokenGuard, CASLGuard),
    ApiBearerAuth(),
    ApiUnauthorizedResponse({
      description: 'Unauthorized',
      schema: {
        type: 'object',
        properties: {
          statusCode: { type: 'number', example: 401 },
          message: { type: 'string', example: 'Unauthorized' },
        },
      },
    }),
  );
}
