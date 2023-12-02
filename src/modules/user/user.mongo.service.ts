import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { loadEntityManager } from 'src/common/helpers/loadEntityManager.helper';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { User as UserMongo } from './entities/user.mongo.entity';
import { User as UserMysql } from './entities/user.mysql.entity';

@Injectable()
export class UserMongoService {
  constructor(private moduleRef: ModuleRef) {}

  async create(createUserDto: CreateUserDto, systemId) {
    const entityManager = await loadEntityManager(systemId, this.moduleRef);
    let user: any;

    user = await entityManager
      .getMongoRepository(UserMongo)
      .save(createUserDto);

    if (!user) {
      return false;
    }
    return true;
  }
  async findAll(systemId: string): Promise<UserMysql[]> {
    let listUser: any = [];

    const entityManager = await loadEntityManager(systemId, this.moduleRef);
    if (!entityManager) {
      throw new InternalServerErrorException();
    }
    listUser = await entityManager.getMongoRepository(UserMongo).find();
    listUser = listUser.map((item) => {
      return { ...item, id: item.id.toString() };
    });

    if (!listUser.length) {
      throw new NotFoundException();
    }

    return listUser;
  }

  async findOne(id: number): Promise<UserMongo> {
    const entityManagerMongo = await loadEntityManager('MONGO', this.moduleRef);
    let user = await entityManagerMongo
      .getMongoRepository(UserMongo)
      .findOneBy({ where: id });

    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    return null;
  }

  async remove(id: number) {
    return null;
  }
}
