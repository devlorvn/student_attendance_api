import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { Student } from "src/modules/student/entities/student.entity";
import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";

@Injectable()
export class AppStrategy extends PassportStrategy(Strategy, 'app') {
  constructor(private authService: AuthService) {
    super(
      {
        usernameField: "username"
      }
    );
  }

  async validate(username: number, password: string): Promise<Student> {
    return await this.authService.validateUser(username, password);
  }
}
