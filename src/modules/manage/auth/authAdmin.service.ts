import { JwtService } from "@nestjs/jwt";
import * as bcryptjs from "bcryptjs";
import { Injectable } from "@nestjs/common";
import * as dayjs from "dayjs";
import { IRefreshTokenPayload, ITokenPayload } from "src/modules/manage/auth/authAdmin.interface";
import { ConfigService } from "@nestjs/config";
import Admin from "../admin/entities/admin.entity";
import { ExceptionFactory } from "src/common/exceptions/exceptionsFactory";
import AdminService from "../admin/admin.service";
import { CreateAdminDto } from "../admin/dto/admin.dto";
import { AdminErrorCode } from "src/common/enums";

@Injectable()
export class AuthService {
  constructor(
    private readonly adminService: AdminService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  // public async register(registrationData: CreateAdminDto) {
  //   const { email } = await this.adminService.createAdmin(registrationData);
  //   return {
  //     email,
  //   };
  // }

  public async validateAdmin(email: string, password: string): Promise<Admin> {
    const admin: Admin | null = await this.adminService.findOne({
      where: {
        email: email,
      },
    });

    if (!admin || !bcryptjs.compareSync(password, admin.password)) {
      throw ExceptionFactory.badRequestException({
        message: "Tài khoản hoặc mật khẩu không chính xác.",
        errorCode: AdminErrorCode.LOGIN_FAILED,
      });
    }

    delete admin.password;

    return admin;
  }

  public async login(email: Admin["email"]) {
    const token: string = this.generateToken({
      email,
      createdAt: new Date(),
      expireIn: dayjs().add(1, "day").toDate(),
    });

    const refreshToken: string = this.generateRefreshToken({
      token,
      createdAt: new Date(),
      expireIn: dayjs().add(7, "day").toDate(),
    });

    await this.adminService.updateAdmin(email, {
      more_info: {
        token: bcryptjs.hashSync(token),
        refreshToken: bcryptjs.hashSync(refreshToken),
      },
    });

    return {
      token,
      refreshToken,
    };
  }

  private generateToken(payload: ITokenPayload) {
    return this.jwtService.sign(payload, {
      expiresIn: this.configService.get("JWT_TOKEN_EXPIRE_TIME"),
    });
  }

  private generateRefreshToken(payload: IRefreshTokenPayload) {
    return this.jwtService.sign(payload, {
      expiresIn: this.configService.get("JWT_REFRESH_TOKEN_EXPIRE_TIME"),
    });
  }
}
