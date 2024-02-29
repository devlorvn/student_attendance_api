import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import Admin from "./entities/admin.entity";
import { DeepPartial, FindOptionsSelect, FindOptionsWhere, ILike, Repository } from "typeorm";
import { CreateAdminDto, UpdateAdminDto } from "./dto/admin.dto";
import { NullableType } from "src/common/types";
import { AdminErrorCode, PostgresErrorCode } from "src/common/enums";
import { ExceptionFactory } from "src/common/exceptions/exceptionsFactory";
import { PaginationDto } from "src/common/dtos";

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
          message: `Admin với email=${createAdminDto.email} đã được sử dụng.`,
          errorCode: -100,
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
  async findAll({
    pagination,
    where,
    fields,
  }: {
    pagination: PaginationDto;
    where?: FindOptionsWhere<Admin>;
    fields?: FindOptionsSelect<Admin>;
  }): Promise<Admin[]> {
    return await this.adminRepository.find({
      where: {
        ...where,
        email: where?.email && ILike(`%${where.email}%`),
        name: where?.name && ILike(`%${where.name}%`),
      },
      select: fields,
      take: pagination.pageSize,
      skip: pagination.skip,
      order: pagination.orderBy,
    });
  }

  // GET BY ID
  async findOneById(id: Admin["id"]) {
    const user = await this.adminRepository.findOne({ where: { id } });
    if (!user)
      throw ExceptionFactory.notFoundException({
        message: "Admin không được tìm thấy",
      });
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
      throw ExceptionFactory.notFoundException({
        message: "Admin không được tìm thấy",
      });
    }
  }
}
