import { JwtService } from "@nestjs/jwt";
import * as bcryptjs from "bcryptjs";
import { Injectable } from "@nestjs/common";
import { CreateStudentDto, UpdatePasswordStudentDto } from "src/modules/student/dtos/student.dto";
import { Student } from "src/modules/student/entities/student.entity";
import { StudentService } from "src/modules/student/student.service";
import { ExceptionFactory } from "src/common/exceptions/exceptionsFactory";
import * as dayjs from "dayjs";
import { IRefreshTokenPayload, ITokenPayload } from "src/modules/app/auth/auth.interface";
import { ConfigService } from "@nestjs/config";
import { StudentErrorCode } from "src/common/enums";

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

    if (!user || !bcryptjs.compareSync(password, user.password)) {
      throw ExceptionFactory.badRequestException({
        message: "Tài khoản hoặc mật khẩu không chính xác.",
        errorCode: StudentErrorCode.VALIDATE_FAILED,
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
    if (!this.compare(changePasswordData.oldPassword, user.password)) {
      throw ExceptionFactory.badRequestException({
        message: "Mật khẩu không chính xác.",
        errorCode: StudentErrorCode.VALIDATE_FAILED,
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
        errorCode: StudentErrorCode.NOT_FOUND,
      });
    }

    await this.studentService.update(user, { password: user.mssv.toString() });
  }

  /**
   * Compare text and hash text using bcrypt
   * @param plainText
   * @param hashText
   * @returns Boolean
   */
  private compare(plainText: string, hashText: string) {
    return bcryptjs.compareSync(plainText, hashText);
  }

  /**
   * Generate token and update to DB
   * @param mssv
   * @param tokenExpire default 1 day
   * @param refreshTokenExpire default 7 days
   * @returns token, refreshToken
   */
  private async generateForAuth(mssv: Student["mssv"], tokenExpire: number = 1, refreshTokenExpire: number = 7) {
    const newToken: string = this.generateToken({
      mssv,
      createdAt: new Date(),
      expireIn: dayjs().add(tokenExpire, "day").toDate(),
    });

    const newRefreshToken: string = this.generateRefreshToken({
      mssv,
      createdAt: new Date(),
      expireIn: dayjs().add(refreshTokenExpire, "day").toDate(),
    });

    await this.studentService.updateById(mssv, {
      moreInfo: {
        token: bcryptjs.hashSync(newToken),
        refreshToken: bcryptjs.hashSync(newRefreshToken),
      },
    });

    return {
      token: newToken,
      refreshToken: newRefreshToken,
    };
  }

  private generateToken(payload: ITokenPayload) {
    return this.jwtService.sign(payload, {
      expiresIn: this.configService.get("JWT_TOKEN_EXPIRE_TIME"),
      secret: this.configService.get("JWT_SECRET"),
    });
  }

  private generateRefreshToken(payload: IRefreshTokenPayload) {
    return this.jwtService.sign(payload, {
      expiresIn: this.configService.get("JWT_REFRESH_TOKEN_EXPIRE_TIME"),
      secret: this.configService.get("JWT_REFRESH_SECRET"),
    });
  }
}
