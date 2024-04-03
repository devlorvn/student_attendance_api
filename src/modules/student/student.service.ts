import { Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { loadEntityManager } from "src/common/helpers/loadEntityManager.helper";
import { CreateStudentDto } from "./dtos/student.dto";
import { Student } from "./entities/student.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, FindOptionsSelect, FindOptionsWhere, ILike, Repository } from "typeorm";
import { NullableType } from "src/common/types/nullable.type";
import { ExceptionFactory } from "src/common/exceptions/exceptionsFactory";
import { PostgresErrorCode } from "src/common/enums/postgresErrorCode.enum";
import { PaginationDto } from "src/common/dtos";

@Injectable()
export class StudentService {
  constructor(
    private moduleRef: ModuleRef,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>
  ) {}

  async create(createUserDto: DeepPartial<Student>) {
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

  // GET ALL
  async findAll({
    pagination,
    where,
    fields,
  }: {
    pagination: PaginationDto;
    where?: FindOptionsWhere<Student>;
    fields?: FindOptionsSelect<Student>;
  }): Promise<Student[]> {
    return await this.studentRepository.find({
      where: {
        ...where,
        firstName: where?.firstName && ILike(`%${where.firstName}%`),
      },
      select: fields,
      take: pagination.pageSize,
      skip: pagination.skip,
      order: pagination.orderBy,
    });
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

  // VALIDATE USERS
  /**
   * @param ids - Array of ID student to update
   * @param payload - include validate, validateBy, validateAt
   * @returns void
   */
  async updateByIds(mssvArr: Student["mssv"][], payload: DeepPartial<Student>) {
    const result = await this.studentRepository
      .createQueryBuilder("student")
      .update(Student)
      .set({
        ...payload,
      })
      .where("mssv IN (:...mssvArr)", { mssvArr })
      .execute();

    if (result.affected == 0) {
      throw ExceptionFactory.badRequestException({
        message: `Event với các id không được tìm thấy hoặc không thể cập nhật`,
        errorCode: -1,
      });
    }

    if (result.affected < mssvArr.length) {
      console.log("Một vài id không được cập nhật do không tìm thấy");
    }
  }

  async createMultiple(users: DeepPartial<Student>[]) {
    const newUsers = users.map((user) => {
      return this.studentRepository.create(user);
    });
    const result = await this.studentRepository.save(newUsers);
    return result;
  }

  async delete(mssv: Student["mssv"]) {
    return await this.studentRepository.delete(mssv);
  }
}
