import { RequestWithUser } from "./auth.interface";
import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "src/modules/app/auth/auth.service";
import { LocalAuthGuard } from "src/common/guards/local.guard";
import { CreateStudentDto } from "src/modules/student/dtos/student.dto";
import { ApiBody, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { RegisterExample } from "./entities/registerResponse.entity";
import { LoginExample } from "./entities/loginResponse.entity";
import { LoginDto } from "./dtos/login.dto";

@Controller("app/auth")
@ApiTags("App api")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  @ApiOkResponse({
    type: LoginExample,
  })
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: LoginDto,
  })
  async login(@Req() req: RequestWithUser) {
    return this.authService.login(req.user.mssv);
  }

  @Post("register")
  @ApiOkResponse({
    description: "Đăng kí tài khoản mới",
    type: RegisterExample,
  })
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: CreateStudentDto,
  })
  async register(@Body() data: CreateStudentDto) {
    return this.authService.register(data);
  }
}
