import { Request } from "express";
import { UnauthorizedException } from "@nestjs/common";
import { ExceptionFactory } from "../exceptions/exceptionsFactory";

export function getTokenFromHeader(request: Request, name: string): string {
  const token = request.headers["name"] as string;
  if (!token)
    throw ExceptionFactory.unauthorizedException({
      message: `${name} is required.`,
    });
  return token;
}
