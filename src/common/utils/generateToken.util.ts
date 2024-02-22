import * as dayjs from "dayjs";
import { GenerateJwt } from "./generateJwt.util";
import { JwtService } from "@nestjs/jwt";

export async function generateToken(key: string | number, jwtService: JwtService, secret: string, tokenExpire: number = 86400) {
  const newToken: string = await GenerateJwt.signWithToken(
    {
      key,
      createdAt: new Date(),
      expireIn: dayjs().add(tokenExpire, "milliseconds").toDate(),
    },
    jwtService,
    secret,
    tokenExpire
  );

  return newToken;
}
