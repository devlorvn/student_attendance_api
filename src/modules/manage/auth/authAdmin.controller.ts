import { RequestWithAdmin } from "./authAdmin.interface";
import { Body, Controller, HttpCode, HttpStatus, Patch, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { LoginAdminResponse } from "./entities/loginResponse.entity";
import { LoginAdminDto } from "./dtos/loginAdmin.dto";
import { AuthService } from "./authAdmin.service";
import { UpdatePasswordAdminDto } from "../admin/dto/admin.dto";
import { AdminAuthGuard, JwtAdminAuthGuard } from "src/common/guards";
import { BaseResponseEntity } from "src/common/entities/BaseResponse.entity";

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
  @ApiOkResponse({
    type: BaseResponseEntity,
  })
  async logout(@Req() req: RequestWithAdmin) {
    return this.authService.logout(req.user.id);
  }

  @UseGuards(JwtAdminAuthGuard)
  @Patch("change-password")
  @HttpCode(HttpStatus.OK)
  @ApiOkResponse({
    type: BaseResponseEntity,
  })
  async changePassword(@Req() req: RequestWithAdmin, @Body() data: UpdatePasswordAdminDto) {
    return this.authService.changePassword(req.user, data);
  }
}
