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
  async createPositionAdmin(createPositionDto: CreatePositionAdminDto) {
    const newPosition = this.positionAdminRepository.create(createPositionDto);
    await this.positionAdminRepository.save(newPosition);
    return newPosition;
  }

  // UPDATE
  async updatePositionAdmin(updatePositionDto: UpdatePositionAdminDto) {
    const { id, ...updateData } = updatePositionDto;
    await this.positionAdminRepository.update(id, updateData);
  }

  // GET ALL
  async getAllPositionAdmin() {
    const positions = await this.positionAdminRepository.find();
    return positions;
  }

  // GET BY ID
  async getPositionAdminById(id: string) {
    const position = await this.positionAdminRepository.findOne({
      where: { id },
    });
    if (!position)
      throw ExceptionFactory.notFoundException({
        message: `Position with id: ${id} was not found`,
        errorCode: AdminErrorCode.INVALID_POSITION,
      });

    return position;
  }

  // DELETE
  async deletePositionAdmin(id: string) {
    const result = await this.positionAdminRepository.delete(id);
    if (!result.affected) {
      throw ExceptionFactory.notFoundException({
        message: `Position with id: ${id} was not found`,
        errorCode: AdminErrorCode.INVALID_POSITION,
      });
    }
  }

  // CHECK IF EXIST ID
  async existPositionAdmin(id: string) {
    const exist = await this.positionAdminRepository.exist({ where: { id } });
    if (!exist) {
      throw ExceptionFactory.notFoundException({
        message: `Position with id: ${id} was not found`,
        errorCode: AdminErrorCode.INVALID_POSITION,
      });
    }
  }
}
