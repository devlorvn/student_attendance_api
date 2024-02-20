import { RequestWithUser } from "./auth.interface";
import { Body, Controller, HttpCode, HttpStatus, Post, Put, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "src/modules/app/auth/auth.service";
import { AppAuthGuard } from "src/common/guards/app/app.guard";
import { CreateStudentDto, UpdatePasswordStudentDto } from "src/modules/student/dtos/student.dto";
import { ApiBody, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { RegisterStudent } from "./entities/registerResponse.entity";
import { LoginStudent } from "./entities/loginResponse.entity";
import { LoginDto } from "./dtos/login.dto";
import { ResetStudentPassword } from "./dtos/reset.dto";
import { JwtAdminAuthGuard, JwtAuthGuard, JwtRefreshAuthGuard } from "src/common/guards";

@Controller("app/auth")
@ApiTags("App api")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AppAuthGuard)
  @Post("login")
  @ApiOkResponse({
    type: LoginStudent,
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
    type: RegisterStudent,
  })
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: CreateStudentDto,
  })
  async register(@Body() data: CreateStudentDto) {
    return this.authService.register(data);
  }

  @UseGuards(JwtRefreshAuthGuard)
  @Post("refresh")
  @HttpCode(HttpStatus.OK)
  async refresh(@Req() req: RequestWithUser) {
    return this.authService.refreshToken(req.user.mssv);
  }

  @UseGuards(JwtAuthGuard)
  @Post("logout")
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: RequestWithUser) {
    return this.authService.logout(req.user.mssv);
  }

  @UseGuards(JwtAuthGuard)
  @Put("change-password")
  @HttpCode(HttpStatus.OK)
  async changePassword(@Req() req: RequestWithUser, @Body() data: UpdatePasswordStudentDto) {
    return this.authService.changePassword(req.user, data);
  }

  @Post("reset-password")
  @UseGuards(JwtAdminAuthGuard)
  @HttpCode(HttpStatus.OK)
  async resetPassword(@Body() data: ResetStudentPassword) {
    return this.authService.resetPassword(parseInt(data.mssv));
  }
}
