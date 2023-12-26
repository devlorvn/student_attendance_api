import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { StudentService } from "src/modules/student/student.service";
import { IRefreshTokenPayload, ITokenPayload } from "src/modules/app/auth/auth.interface";
import { Student } from "src/modules/student/entities/student.entity";
import { ExceptionFactory } from "src/common/exceptions/exceptionsFactory";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, "jwt-user") {
  constructor(
    private readonly configService: ConfigService,
    private readonly userService: StudentService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader("token"),
      ignoreExpiration: false,
      secretOrKey: configService.get("JWT_SECRET"),
    });
  }

  async validate(payload: ITokenPayload) {
    const user: Student | null = await this.userService.findOne({
      where: {
        mssv: payload.mssv,
      },
    });

    if (!user) {
      throw ExceptionFactory.unauthorizedException({
        message: "Wrong token",
        errorCode: 401,
      });
    }
    return user;
  }
}

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(Strategy, "jwt-user-refresh") {
  constructor(
    private readonly configService: ConfigService,
    private readonly studentService: StudentService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromHeader("refreshtoken"),
      ignoreExpiration: false,
      secretOrKey: configService.get("JWT_REFRESH_SECRET"),
    });
  }

  async validate(payload: IRefreshTokenPayload) {
    const user: Student | null = await this.studentService.findOne({ where: { mssv: payload.mssv } });
    if (!user) {
      throw ExceptionFactory.unauthorizedException({
        message: "Wrong token",
        errorCode: 401,
      });
    }
    return user;
  }
}
