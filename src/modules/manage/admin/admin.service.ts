import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Admin from "./entities/admin.entity";
import { DeepPartial, FindOptionsSelect, FindOptionsWhere, Repository } from "typeorm";
import { CreateAdminDto, UpdateAdminDto } from "./dto/admin.dto";
import { NullableType } from "src/common/types";
import { AdminErrorCode, PostgresErrorCode } from "src/common/enums";
import { ExceptionFactory } from "src/common/exceptions/exceptionsFactory";

@Injectable()
export default class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepository: Repository<Admin>
  ) {}

  // CREATE
  async create(createAdminDto: CreateAdminDto) {
    try {
      const newAdmin = this.adminRepository.create(createAdminDto);
      return await this.adminRepository.save(newAdmin);
    } catch (error) {
      if ((error.code = PostgresErrorCode.UniqueViolation)) {
        throw ExceptionFactory.badRequestException({
          message: `Admin with email=${createAdminDto.email} had already taken.`,
          errorCode: AdminErrorCode.EXIST_EMAIL,
        });
      }
      throw error;
    }
  }

  // UPDATE BY ID
  async updateById(id: Admin["id"], payload: DeepPartial<Admin>) {
    return await this.adminRepository.save({ id, ...payload });
  }

  // UPDATE BY ADMIN OBJECT
  async update(admin: Admin, payload: DeepPartial<Admin>) {
    return await this.adminRepository.save(Object.assign(admin, payload));
  }

  // GET ALL
  async findAll() {
    const admins = await this.adminRepository.find();
    return admins;
  }

  // GET BY ID
  async findOneById(id: Admin["id"]) {
    const user = await this.adminRepository.findOne({ where: { id } });
    if (!user) throw new HttpException("Admin not found", HttpStatus.NOT_FOUND);

    return user;
  }

  // GET ONE BY ANY CLAUSE
  async findOne({ where, fields }: { where: FindOptionsWhere<Admin>; fields?: FindOptionsSelect<Admin> }): Promise<NullableType<Admin>> {
    return this.adminRepository.findOne({
      where: where,
      select: fields,
    });
  }

  // DELETE
  async delete(id: Admin["id"]) {
    const result = await this.adminRepository.delete(id);
    if (!result.affected) {
      throw new HttpException("Admin not found", HttpStatus.NOT_FOUND);
    }
  }
}
