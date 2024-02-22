import { JwtService } from "@nestjs/jwt";

export interface IToken {
  key: string | number;
  createdAt: Date;
  expireIn: Date;
}

export class GenerateJwt {
  static async signWithToken(payload: IToken, jwtService: JwtService, secret: string, expireIn: number) {
    return jwtService.sign(payload, {
      expiresIn: expireIn,
      secret: secret,
    });
  }
}
