import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ExceptionFactory } from "src/common/exceptions/exceptionsFactory";
import Admin from "../../admin/entities/admin.entity";
import AdminService from "../../admin/admin.service";
import { ITokenPayload } from "../authAdmin.interface";

@Injectable()
export class JwtAdminStrategy extends PassportStrategy(Strategy, "jwt-admin") {
  constructor(
    private readonly configService: ConfigService,
    private readonly adminService: AdminService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader("token"),
      ignoreExpiration: false,
      secretOrKey: configService.get("JWT_SECRET"),
    });
  }

  async validate(payload: ITokenPayload) {
    const admin: Admin | null = await this.adminService.findOneById(payload.key);
    if (!admin) {
      throw ExceptionFactory.unauthorizedException({
        message: "Wrong token",
        errorCode: 401,
      });
    }
    return admin;
  }
}
