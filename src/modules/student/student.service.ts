import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { loadEntityManager } from 'src/common/helpers/loadEntityManager.helper';
import { CreateStudentDto, UpdateUserDto } from './dto/user.dto';
import { Student as StudentEntity } from './entities/student.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, FindOptionsSelect, FindOptionsWhere, Repository } from 'typeorm';
import { NullableType } from 'src/common/types/nullable.type';

@Injectable()
export class StudentService {
  constructor(
    private moduleRef: ModuleRef,
    @InjectRepository(StudentEntity)
    private studentRepository: Repository<StudentEntity>,
  ) {}

  async create(createUserDto: CreateStudentDto) {
    return this.studentRepository.save(this.studentRepository.create(createUserDto));
  }

  async findAll(systemId: string): Promise<StudentEntity[]> {
    let listUser: any = [];

    const entityManager = await loadEntityManager(systemId, this.moduleRef);
    if (!entityManager) {
      throw new InternalServerErrorException();
    }
    listUser = await entityManager.getRepository(StudentEntity).find();

    if (!listUser.length) {
      throw new NotFoundException();
    }

    return listUser;
  }

  async findOne(where: FindOptionsWhere<StudentEntity>, fields?: FindOptionsSelect<StudentEntity>): Promise<NullableType<StudentEntity>> {
    return this.studentRepository.findOne({
      where: where,
      select: fields
    })
  }

  async update(mssv: StudentEntity["mssv"], payload: DeepPartial<StudentEntity> ) {
    return this.studentRepository.save({mssv: mssv, ...payload})
  }

  async enable(mssv: StudentEntity["mssv"]) {
    await this.studentRepository.save({mssv: mssv, enable: false})
    return true;
  }
}
