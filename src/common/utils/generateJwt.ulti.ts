import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";

export interface IToken {
  key: string | number;
  createdAt: Date;
  expireIn: Date;
}

export class GenerateJwt {
  static async signWithToken(payload: IToken, jwtService: JwtService, configService: ConfigService) {
    return jwtService.sign(payload, {
      expiresIn: configService.get("JWT_TOKEN_EXPIRE_TIME"),
      secret: configService.get("JWT_SECRET"),
    });
  }

  static async signWithRefreshToken(payload: IToken, jwtService: JwtService, configService: ConfigService) {
    return jwtService.sign(payload, {
      expiresIn: configService.get("JWT_REFRESH_TOKEN_EXPIRE_TIME"),
      secret: configService.get("JWT_REFRESH_TOKEN"),
    });
  }
}
