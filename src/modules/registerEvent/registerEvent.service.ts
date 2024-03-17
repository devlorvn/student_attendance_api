import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, FindOptionsSelect, FindOptionsWhere, ILike, Repository } from "typeorm";
import { ExceptionFactory } from "src/common/exceptions/exceptionsFactory";
import { PaginationDto } from "src/common/dtos";
import RegisterEvent from "./entities/registerEvent.entity";
import { CreateMultiRegisterEventDto, CreateRegisterEventDto, UpdateRegisterEventDto } from "./dto/registerEvent.dto";

@Injectable()
export default class RegisterEventService {
  constructor(
    @InjectRepository(RegisterEvent)
    private registerEventRepository: Repository<RegisterEvent>
  ) {}

  // CREATE
  async create(createRegisterEventDto: CreateRegisterEventDto) {
    const newRegister = this.registerEventRepository.create(createRegisterEventDto);
    await this.registerEventRepository.save(newRegister);
    return newRegister;
  }

  // CREATE
  async createMultiple(createMultiRegisterEventDto: CreateMultiRegisterEventDto) {
    const newRegister = createMultiRegisterEventDto.mssv.map((id) => {
      return this.registerEventRepository.create({ mssv: id, eventId: createMultiRegisterEventDto.eventId });
    });
    const result = await this.registerEventRepository.save(newRegister);
    return result;
  }

  // UPDATE BY ID
  async updateById(id: RegisterEvent["id"], payload: DeepPartial<RegisterEvent>) {
    payload.id = id;
    return await this.registerEventRepository.save(payload);
  }

  // GET ALL
  async findAll({
    pagination,
    where,
    fields,
  }: {
    pagination: PaginationDto;
    where?: FindOptionsWhere<RegisterEvent>;
    fields?: FindOptionsSelect<RegisterEvent>;
  }): Promise<RegisterEvent[]> {
    return await this.registerEventRepository.find({
      where: {
        ...where,
      },
      select: fields,
      take: pagination.pageSize,
      skip: pagination.skip,
      order: pagination.orderBy,
      relations: ["eventId", "mssv"],
    });
  }

  // GET BY ID
  async findById(id: RegisterEvent["id"]) {
    const registered = await this.registerEventRepository.findOne({
      where: { id },
      relations: ["eventId", "mssv"],
    });

    if (!registered)
      throw ExceptionFactory.notFoundException({
        message: `Registered with id: ${id} was not found`,
      });

    return registered;
  }

  // DELETE
  async delete(id: RegisterEvent["id"]) {
    const result = await this.registerEventRepository.delete(id);
    if (!result.affected) {
      throw ExceptionFactory.notFoundException({
        message: `Register with id: ${id} was not found`,
      });
    }
  }

  // CHECK IF EXIST ID
  async exist(id: RegisterEvent["id"]) {
    const exist = await this.registerEventRepository.exist({ where: { id } });
    if (!exist) {
      throw ExceptionFactory.notFoundException({
        message: `Register with id: ${id} was not found`,
      });
    }
  }
}
