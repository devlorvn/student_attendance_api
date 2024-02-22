import * as dayjs from "dayjs";
import { GenerateJwt } from "./generateJwt.ulti";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

/**
 * Generate refresh token
 * @param key
 * @param refreshTokenExpire default 7 day
 * @param configService
 * @param jwtService
 * @returns string
 */
export async function generateRefreshToken(
  key: string | number,
  jwtService: JwtService,
  configService: ConfigService,
  refreshTokenExpire: number = 7
) {
  const refreshToken: string = await GenerateJwt.signWithRefreshToken(
    {
      key,
      createdAt: new Date(),
      expireIn: dayjs().add(refreshTokenExpire, "day").toDate(),
    },
    jwtService,
    configService
  );

  return refreshToken;
}
