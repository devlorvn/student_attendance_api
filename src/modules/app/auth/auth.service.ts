import bcryptjs from 'bcryptjs';
import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from 'src/modules/student/dtos/student.dto';
import { Student } from 'src/modules/student/entities/student.entity';
import { StudentService } from 'src/modules/student/student.service';
import { ExceptionFactory } from 'src/common/exceptions/exceptionsFactory';

@Injectable()
export class AuthService {
  constructor(
    private readonly studentService: StudentService
  ) {}

  public async register(registrationData: CreateStudentDto) {
    await this.studentService.create(registrationData);

    return {
      message: 'success',
      errorCode: 0,
    };
  }

  public async getAuthUser(mssv: number, password: string): Promise<Student> {
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

    return 
  }
}
