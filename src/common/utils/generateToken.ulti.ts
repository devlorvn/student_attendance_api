import * as dayjs from "dayjs";
import { GenerateJwt } from "./generateJwt.ulti";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

/**
 * Generate token
 * @param key
 * @param tokenExpire default 1 day
 * @param configService
 * @param jwtService
 * @returns string
 */
export async function generateToken(key: string | number, jwtService: JwtService, configService: ConfigService, tokenExpire: number = 1) {
  const newToken: string = await GenerateJwt.signWithToken(
    {
      key,
      createdAt: new Date(),
      expireIn: dayjs().add(tokenExpire, "day").toDate(),
    },
    jwtService,
    configService
  );

  return newToken;
}
