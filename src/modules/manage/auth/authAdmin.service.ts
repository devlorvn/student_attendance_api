import { JwtService } from "@nestjs/jwt";
import * as bcryptjs from "bcryptjs";
import { Injectable } from "@nestjs/common";
import * as dayjs from "dayjs";
import { ITokenPayload } from "src/modules/manage/auth/authAdmin.interface";
import { ConfigService } from "@nestjs/config";
import Admin from "../admin/entities/admin.entity";
import { ExceptionFactory } from "src/common/exceptions/exceptionsFactory";
import AdminService from "../admin/admin.service";
import { AdminErrorCode } from "src/common/enums";
import { UpdatePasswordAdminDto } from "../admin/dto/admin.dto";
import { comparePass, generateToken } from "src/common/utils";

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  public async validateAdmin(email: string, password: string): Promise<Admin> {
    const admin: Admin | null = await this.adminService.findOne({
      where: {
        email: email,
      },
    });

    if (!admin || !comparePass(password, admin.password)) {
      throw ExceptionFactory.badRequestException({
        message: "Tài khoản hoặc mật khẩu không chính xác.",
      });
    }

    if (!admin.enable) {
      throw ExceptionFactory.forbiddenException({
        message: "Tài khoản không được kích hoạt.",
      });
    }

    delete admin.password;

    return admin;
  }

  public async login(id: Admin["id"]) {
    const token: string = await generateToken(
      id,
      this.jwtService,
      this.configService.get("JWT_SECRET"),
      this.configService.get("JWT_TOKEN_EXPIRE_TIME")
    );
    const user = await this.adminService.updateById(id, {
      more_info: {
        token: token,
      },
    });
    return {
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    };
  }

  public async changePassword(admin: Admin, changePasswordData: UpdatePasswordAdminDto) {
    if (!comparePass(changePasswordData.oldPassword, admin.password)) {
      throw ExceptionFactory.badRequestException({
        message: "Tài khoản hoặc mật khẩu không chính xác.",
      });
    }
    const result = await this.adminService.update(admin, { password: changePasswordData.newPassword });
  }

  public async logout(id: Admin["id"]): Promise<void> {
    await this.adminService.updateById(id, { more_info: {} });
  }
}
