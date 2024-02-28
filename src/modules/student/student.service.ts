import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { loadEntityManager } from "src/common/helpers/loadEntityManager.helper";
import { CreateStudentDto } from "./dtos/student.dto";
import { Student } from "./entities/student.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, FindOptionsSelect, FindOptionsWhere, Repository } from "typeorm";
import { NullableType } from "src/common/types/nullable.type";
import { ExceptionFactory } from "src/common/exceptions/exceptionsFactory";
import { PostgresErrorCode } from "src/common/enums/postgresErrorCode.enum";

@Injectable()
export class StudentService {
  constructor(
    private moduleRef: ModuleRef,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>
  ) {}

  async create(createUserDto: CreateStudentDto) {
    try {
      return this.studentRepository.save(this.studentRepository.create(createUserDto));
    } catch (error) {
      if ((error.code = PostgresErrorCode.UniqueViolation)) {
        throw ExceptionFactory.badRequestException({
          message: `Student với id=${createUserDto.mssv} đã tồn tại.`,
          errorCode: 1,
        });
      }
      throw error;
    }
  }

  async findAll({
    where,
    fields,
    limit = 10,
    page = 1,
  }: {
    where?: FindOptionsWhere<Student>;
    fields?: FindOptionsSelect<Student>;
    limit?: number;
    page?: number;
  }) {
    return await this.studentRepository.find({ where: where, select: fields, take: limit, skip: (page - 1) * limit });
  }

  async findOne({ where, fields }: { where: FindOptionsWhere<Student>; fields?: FindOptionsSelect<Student> }): Promise<NullableType<Student>> {
    const user = await this.studentRepository.findOne({
      where: where,
      select: fields,
    });
    return user;
  }

  async updateById(mssv: Student["mssv"], payload: DeepPartial<Student>): Promise<Student> {
    return await this.studentRepository.save({ mssv, ...payload });
  }

  async update(user: Student, payload: DeepPartial<Student>): Promise<Student> {
    return await this.studentRepository.save(Object.assign(user, payload));
  }

  async enable(mssv: Student["mssv"]): Promise<Boolean> {
    await this.studentRepository.save({ mssv: mssv, enable: true });
    return true;
  }

  async disable(mssv: Student["mssv"]): Promise<Boolean> {
    await this.studentRepository.save({ mssv: mssv, enable: false });
    return true;
  }
}
