import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { ExceptionFactory } from "src/common/exceptions/exceptionsFactory";
import Admin from "../../admin/entities/admin.entity";
import AdminService from "../../admin/admin.service";
import { ITokenPayload } from "../authAdmin.interface";
import { compareToken, getTokenFromHeader } from "src/common/utils";
import { Request } from "express";
import { isUUID } from "class-validator";

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
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: ITokenPayload) {
    this.uuidValidate(payload.key);

    const admin: Admin | null = await this.adminService.findOne({
      where: {
        id: payload.key,
      },
    });
    if (!admin && !compareToken(admin.more_info.token, getTokenFromHeader(req, "token"))) {
      throw ExceptionFactory.unauthorizedException({
        message: "Token đã hết hạn hoặc không hợp lệ",
        errorCode: -1,
      });
    }
    return admin;
  }

  uuidValidate(uuid: string) {
    if (!isUUID(uuid)) {
      throw ExceptionFactory.forbiddenException({
        message: "Định dạng uuid không chính xác",
        errorCode: -2,
      });
    }
  }
}
