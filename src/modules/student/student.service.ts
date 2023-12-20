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
          message: `Student with id=${createUserDto.mssv} already exist.`,
          errorCode: 1,
        });
      }
      throw error;
    }
  }

  // async findAll(systemId: string): Promise<Student[]> {
  //   let listUser: any = [];

  //   const entityManager = await loadEntityManager(systemId, this.moduleRef);
  //   if (!entityManager) {
  //     throw new InternalServerErrorException();
  //   }
  //   listUser = await entityManager.getRepository(Student).find();

  //   if (!listUser.length) {
  //     throw new NotFoundException();
  //   }

  //   return listUser;
  // }

  async findAll(systemId: string): Promise<Student[]> {
    let listUser: any = [];

    const entityManager = await loadEntityManager(systemId, this.moduleRef);
    if (!entityManager) {
      throw new InternalServerErrorException();
    }
    listUser = await entityManager.getRepository(Student).find();

    if (!listUser.length) {
      throw new NotFoundException();
    }

    return listUser;
  }

  async findOne({ where, fields }: { where: FindOptionsWhere<Student>; fields?: FindOptionsSelect<Student> }): Promise<NullableType<Student>> {
    return this.studentRepository.findOne({
      where: where,
      select: fields,
    });
  }

  async update(mssv: Student["mssv"], payload: DeepPartial<Student>): Promise<Student> {
    return this.studentRepository.save({ mssv: mssv, ...payload });
  }

  async enable(mssv: Student["mssv"]): Promise<Boolean> {
    await this.studentRepository.save({ mssv: mssv, enable: false });
    return true;
  }
}
