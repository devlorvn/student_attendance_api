import { JwtService } from "@nestjs/jwt";
import { Injectable } from "@nestjs/common";
import { CreateStudentDto, UpdatePasswordStudentDto } from "src/modules/student/dtos/student.dto";
import { Student } from "src/modules/student/entities/student.entity";
import { StudentService } from "src/modules/student/student.service";
import { ExceptionFactory } from "src/common/exceptions/exceptionsFactory";
import * as dayjs from "dayjs";
import { IRefreshTokenPayload, ITokenPayload } from "src/modules/app/auth/auth.interface";
import { ConfigService } from "@nestjs/config";
import { comparePass, generateRefreshToken, generateToken } from "src/common/utils";

@Injectable()
export class AuthService {
  constructor(
    private readonly studentService: StudentService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  public async register(registrationData: CreateStudentDto) {
    const { mssv } = await this.studentService.create(registrationData);
    return {
      mssv,
    };
  }

  public async validateUser(mssv: number, password: string): Promise<Student> {
    const user: Student | null = await this.studentService.findOne({
      where: {
        mssv: mssv,
      },
    });

    if (!user || !comparePass(password, user.password)) {
      throw ExceptionFactory.badRequestException({
        message: "Tài khoản hoặc mật khẩu không chính xác.",
        errorCode: -1,
      });
    }

    delete user.password;

    return user;
  }

  public async login(mssv: Student["mssv"]) {
    return await this.generateForAuth(mssv);
  }

  public async logout(mssv: Student["mssv"]) {
    return await this.studentService.updateById(mssv, {
      moreInfo: {},
    });
  }

  public async refreshToken(mssv: Student["mssv"]) {
    return await this.generateForAuth(mssv);
  }

  public async changePassword(user: Student, changePasswordData: UpdatePasswordStudentDto) {
    if (!comparePass(changePasswordData.oldPassword, user.password)) {
      throw ExceptionFactory.badRequestException({
        message: "Mật khẩu không chính xác.",
        errorCode: -1,
      });
    }

    await this.studentService.update(user, { password: changePasswordData.newPassord });
  }

  public async resetPassword(mssv: Student["mssv"]) {
    const user: Student | null = await this.studentService.findOne({
      where: {
        mssv: mssv,
      },
    });

    if (!user) {
      throw ExceptionFactory.badRequestException({
        message: "Tài khoản không tồn tại",
        errorCode: -1,
      });
    }

    await this.studentService.update(user, { password: user.mssv.toString() });
  }

  private async generateForAuth(mssv: Student["mssv"]) {
    const token = await generateToken(mssv, this.jwtService, this.configService);
    const refreshToken = await generateRefreshToken(mssv, this.jwtService, this.configService);
    return {
      token,
      refreshToken,
    };
  }
}
