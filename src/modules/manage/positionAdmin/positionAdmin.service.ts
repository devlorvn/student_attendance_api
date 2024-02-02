import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import PositionAdmin from "./entities/positionAdmin.entity";
import { CreatePositionAdminDto, UpdatePositionAdminDto } from "./dtos/positionAdmin.dto";
import { ExceptionFactory } from "src/common/exceptions/exceptionsFactory";
import { AdminErrorCode } from "src/common/enums";

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

  // UPDATE
  async update(updatePositionDto: UpdatePositionAdminDto) {
    const { id, ...updateData } = updatePositionDto;
    await this.positionAdminRepository.update(id, updateData);
  }

  // GET ALL
  async findAll() {
    const positions = await this.positionAdminRepository.find();
    return positions;
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
