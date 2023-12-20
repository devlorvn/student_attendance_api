import { RequestWithAdmin } from "./authAdmin.interface";
import { Body, Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { LocalAuthGuard } from "src/common/guards/local.guard";
import { ApiBody, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { RegisterAdminResponse } from "./entities/registerResponse.entity";
import { LoginAdminResponse } from "./entities/loginResponse.entity";
import { LoginAdminDto } from "./dtos/loginAdmin.dto";
import { AuthService } from "./authAdmin.service";
import { CreateAdminDto } from "../admin/dto/admin.dto";

@Controller("admin/auth")
@ApiTags("Admin Auth API")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post("login")
  @ApiOkResponse({
    type: LoginAdminResponse,
  })
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: LoginAdminDto,
  })
  async login(@Req() req: RequestWithAdmin) {
    return this.authService.login(req.admin.email);
  }

  // @Post("register")
  // @ApiOkResponse({
  //   description: "Đăng kí quản trị viên mới",
  //   type: RegisterAdminResponse,
  // })
  // @HttpCode(HttpStatus.OK)
  // @ApiBody({
  //   type: CreateAdminDto,
  // })
  // async register(@Body() data: CreateAdminDto) {
  //   return this.authService.register(data);
  // }
}
