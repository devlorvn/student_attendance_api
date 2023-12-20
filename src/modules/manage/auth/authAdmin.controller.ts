import { RequestWithAdmin } from "./authAdmin.interface";
import { Controller, HttpCode, HttpStatus, Post, Req, UseGuards } from "@nestjs/common";
import { ApiBody, ApiOkResponse, ApiTags } from "@nestjs/swagger";
import { LoginAdminResponse } from "./entities/loginResponse.entity";
import { LoginAdminDto } from "./dtos/loginAdmin.dto";
import { AuthService } from "./authAdmin.service";
import { AdminAuthGuard } from "src/common/guards/admin.guard";
import { AuthGuard } from "@nestjs/passport";

@Controller("admin/auth")
@ApiTags("Admin Auth API")
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('admin'))
  @Post("login")
  @ApiOkResponse({
    type: LoginAdminResponse,
  })
  @HttpCode(HttpStatus.OK)
  @ApiBody({
    type: LoginAdminDto,
  })
  async login(@Req() req: RequestWithAdmin) {
    return this.authService.login(req.user.email);
  }
}
