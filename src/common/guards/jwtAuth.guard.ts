import { Injectable } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt-user") {}
@Injectable()
export class JwtRefreshAuthGuard extends AuthGuard("jwt-user-refresh") {}
@Injectable()
export class JwtAdminAuthGuard extends AuthGuard("jwt-admin") {}
// @Injectable()
// export class JwtRefreshAdminAuthGuard extends AuthGuard("jwt-admin-refresh") {}
