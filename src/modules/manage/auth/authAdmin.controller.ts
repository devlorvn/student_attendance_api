import { RequestWithAdmin } from "./authAdmin.interface";
import { Body, Controller, HttpCode, HttpStatus, Post, Put, Req, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { LoginAdminResponse } from "./entities/loginResponse.entity";
import { LoginAdminDto } from "./dtos/loginAdmin.dto";
import { AuthService } from "./authAdmin.service";
import { UpdatePasswordAdminDto } from "../admin/dto/admin.dto";
import { AdminAuthGuard, JwtAdminAuthGuard } from "src/common/guards";

@Controller("admin/auth")
@ApiTags("Admin Auth API")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AdminAuthGuard)
  @Post("login")
  @ApiOkResponse({
    type: LoginAdminResponse,
  })
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: LoginAdminDto,
  })
  async login(@Req() req: RequestWithAdmin) {
    return this.authService.login(req.user.id);
  }

  @UseGuards(JwtAdminAuthGuard)
  @Post("logout")
  @HttpCode(HttpStatus.OK)
  async logout(@Req() req: RequestWithAdmin) {
    return this.authService.logout(req.user.id);
  }

  @UseGuards(JwtAdminAuthGuard)
  @Put("change-password")
  @HttpCode(HttpStatus.OK)
  async changePassword(@Req() req: RequestWithAdmin, @Body() data: UpdatePasswordAdminDto) {
    return this.authService.changePassword(req.user, data);
  }
}
