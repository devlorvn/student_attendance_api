import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../authAdmin.service";
import Admin from "src/modules/manage/admin/entities/admin.entity";
import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

@Injectable()
export class AdminStrategy extends PassportStrategy(Strategy, "admin") {
  constructor(private authService: AuthService) {
    super({
      usernameField: "email",
    });
  }

  async validate(email: string, password: string): Promise<Admin> {
    return await this.authService.validateAdmin(email, password);
  }
}
