import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { loadEntityManager } from 'src/common/helpers/loadEntityManager.helper';
import { CreateStudentDto } from './dto/student.dto';
import { Student } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DeepPartial,
  FindOptionsSelect,
  FindOptionsWhere,
  Repository,
} from 'typeorm';
import { NullableType } from 'src/common/types/nullable.type';

@Injectable()
export class StudentService {
  constructor(
    private moduleRef: ModuleRef,
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {}

  async create(createUserDto: CreateStudentDto) {
    return this.studentRepository.save(
      this.studentRepository.create(createUserDto),
    );
  }

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

  async findOne(
    where: FindOptionsWhere<Student>,
    fields?: FindOptionsSelect<Student>,
  ): Promise<NullableType<Student>> {
    return this.studentRepository.findOne({
      where: where,
      select: fields,
    });
  }

  async update(mssv: Student['mssv'], payload: DeepPartial<Student>) {
    return this.studentRepository.save({ mssv: mssv, ...payload });
  }

  async enable(mssv: Student['mssv']) {
    await this.studentRepository.save({ mssv: mssv, enable: false });
    return true;
  }
}
