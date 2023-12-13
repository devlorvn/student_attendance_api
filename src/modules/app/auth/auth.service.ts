import { JwtService } from '@nestjs/jwt';
import bcryptjs from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from 'src/modules/student/dtos/student.dto';
import { Student } from 'src/modules/student/entities/student.entity';
import { StudentService } from 'src/modules/student/student.service';
import { ExceptionFactory } from 'src/common/exceptions/exceptionsFactory';
import dayjs from 'dayjs';
import { IRefreshTokenPayload, ITokenPayload } from 'src/modules/app/auth/auth.interface';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly studentService: StudentService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async register(registrationData: CreateStudentDto) {
    await this.studentService.create(registrationData);

    return {
      message: 'success',
      errorCode: 0,
    };
  }

  public async validateUser(mssv: number, password: string): Promise<Student> {
    const user: Student | null = await this.studentService.findOne({
      where: {
        mssv: mssv,
      },
    });

    if (!user || bcryptjs.compareSync(password, user.password)) {
      throw ExceptionFactory.badRequestException({
        message: 'Wrong credentials.',
        errorCode: -1,
      });
    }

    delete user.password;

    return user;
  }

  public async login(mssv: Student['mssv']) {
    const token: string = this.generateToken({
      mssv,
      createdAt: new Date(),
      expireIn: dayjs().add(1, 'day').toDate(),
    });

    const refreshToken: string = this.generateRefreshToken({
      token,
      createdAt: new Date(),
      expireIn: dayjs().add(1, 'day').toDate(),
    });

    return {
      token,
      refreshToken,
    };
  }

  private generateToken(payload: ITokenPayload) {
    return this.jwtService.sign(payload, {
      expiresIn: this.configService.get('JWT_TOKEN_EXPIRE_TIME'),
    });
  }

  private generateRefreshToken(payload: IRefreshTokenPayload) {
    return this.jwtService.sign(payload, {
      expiresIn: this.configService.get("JWT_REFRESH_TOKEN_EXPIRE_TIME")
    });
  }
}
