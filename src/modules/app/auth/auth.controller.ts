import { RequestWithUser } from "./auth.interface";
import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "src/modules/app/auth/auth.service";
import { LocalAuthGuard } from "src/common/guards/local.guard";
import { JwtService } from "@nestjs/jwt";
import { CreateStudentDto } from "src/modules/student/dtos/student.dto";
import { ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { RegisterExample } from "./entities/registerResponse.entity";

@Controller("app/auth")
@ApiTags("App api")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Req() req: RequestWithUser) {
    return this.authService.login(req.user.mssv);
  }

  @Post('register')
  @ApiOkResponse({
    description: "Đăng kí tài khoản mới",
    type: RegisterExample
  })
  async register(@Body() data: CreateStudentDto) {
    return this.authService.register(data);
  }
}
