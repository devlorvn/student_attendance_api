import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, FindOptionsSelect, FindOptionsWhere, ILike, Repository } from "typeorm";
import PositionAdmin from "./entities/positionAdmin.entity";
import { CreatePositionAdminDto, UpdatePositionAdminDto } from "./dtos/positionAdmin.dto";
import { ExceptionFactory } from "src/common/exceptions/exceptionsFactory";
import { AdminErrorCode } from "src/common/enums";
import { PaginationDto } from "src/common/dtos";

@Injectable()
export default class PositionAdminService {
  constructor(
    @InjectRepository(PositionAdmin)
    private positionAdminRepository: Repository<PositionAdmin>
  ) {}

  // CREATE
  async create(createPositionDto: CreatePositionAdminDto) {
    const newPosition = this.positionAdminRepository.create(createPositionDto);
    await this.positionAdminRepository.save(newPosition);
    return newPosition;
  }

  // UPDATE BY ID
  async updateById(id: PositionAdmin["id"], payload: DeepPartial<PositionAdmin>) {
    payload.id = id;
    return await this.positionAdminRepository.save(payload);
  }

  // GET ALL
  async findAll({
    pagination,
    where,
    fields,
  }: {
    pagination: PaginationDto;
    where?: FindOptionsWhere<PositionAdmin>;
    fields?: FindOptionsSelect<PositionAdmin>;
  }): Promise<PositionAdmin[]> {
    return await this.positionAdminRepository.find({
      where: {
        ...where,
        name: where?.name && ILike(`%${where.name}%`),
      },
      select: fields,
      take: pagination.pageSize,
      skip: pagination.skip,
      order: pagination.orderBy,
    });
  }

  // GET BY ID
  async findById(id: PositionAdmin["id"]) {
    const position = await this.positionAdminRepository.findOne({
      where: { id },
    });
    if (!position)
      throw ExceptionFactory.notFoundException({
        message: `Position with id: ${id} was not found`,
      });

    return position;
  }

  // DELETE
  async delete(id: PositionAdmin["id"]) {
    const result = await this.positionAdminRepository.delete(id);
    if (!result.affected) {
      throw ExceptionFactory.notFoundException({
        message: `Position with id: ${id} was not found`,
      });
    }
  }

  // CHECK IF EXIST ID
  async exist(id: PositionAdmin["id"]) {
    const exist = await this.positionAdminRepository.exist({ where: { id } });
    if (!exist) {
      throw ExceptionFactory.notFoundException({
        message: `Position with id: ${id} was not found`,
      });
    }
  }
}
