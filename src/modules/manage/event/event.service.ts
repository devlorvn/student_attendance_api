import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, FindOptionsOrder, FindOptionsSelect, FindOptionsWhere, ILike, Repository } from "typeorm";
import { NullableType } from "src/common/types";
import { CreateEventDto, EventDto } from "./dto/event.dto";
import Event from "./entities/event.entity";
import { ExceptionFactory } from "src/common/exceptions/exceptionsFactory";
import { PaginationDto } from "src/common/dtos";

@Injectable()
export default class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>
  ) {}

  // CREATE
  async create(createEventDto: CreateEventDto) {
    const newEvent = this.eventRepository.create(createEventDto);
    return await this.eventRepository.save(newEvent);
  }

  // UPDATE BY ID
  async updateById(id: Event["id"], payload: DeepPartial<Event>) {
    payload.id = id;
    delete payload.createdBy;
    return await this.eventRepository.save(payload);
  }

  // UPDATE BY EVENT OBJECT
  async update(event: Event, payload: DeepPartial<Event>) {
    return await this.eventRepository.save(Object.assign(event, payload));
  }

  // GET ALL
  async findAll({
    pagination,
    where,
    fields,
  }: {
    pagination: PaginationDto;
    where?: FindOptionsWhere<Event>;
    fields?: FindOptionsSelect<Event>;
  }): Promise<Event[]> {
    return await this.eventRepository.find({
      where: {
        ...where,
        title: where?.title && ILike(`%${where.title}%`),
        content: where?.banner && ILike(`%${where.content}%`),
        subTitle: where?.subTitle && ILike(`%${where.subTitle}%`),
      },
      select: fields,
      take: pagination.pageSize,
      skip: pagination.skip,
      order: pagination.orderBy,
    });
  }

  // GET BY ID
  async findOneById(id: Event["id"]) {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event)
      throw ExceptionFactory.notFoundException({
        message: "Event không được tìm thấy",
        errorCode: -1,
      });

    return event;
  }

  // GET ONE BY ANY CLAUSE
  async findOne({ where, fields }: { where: FindOptionsWhere<Event>; fields?: FindOptionsSelect<Event> }): Promise<NullableType<Event>> {
    return await this.eventRepository.findOne({
      where: where,
      select: fields,
    });
  }

  // DELETE
  async delete(id: Event["id"]) {
    const result = await this.eventRepository.delete(id);
    if (!result.affected) {
      throw ExceptionFactory.notFoundException({
        message: "Event không được tìm thấy",
        errorCode: -1,
      });
    }
  }

  // ADD COUNT REGISTER
  async addRegistered(id: Event["id"]) {
    const event = await this.findOne({ where: { id } });
    await this.updateById(id, { registered: event.registered + 1 });
  }

  // ADD COUNT REGISTER
  async subRegistered(id: Event["id"]) {
    const event = await this.findOne({ where: { id } });
    await this.updateById(id, { registered: event.registered - 1 });
  }

  // CHANGE ENABLE STATUS
  async changeEnable(id: Event["id"], enable: boolean) {
    await this.updateById(id, { enable });
  }

  // CHANGE REGISTRATION STATUS
  async changeRegistration(id: Event["id"], registration: boolean) {
    await this.updateById(id, { registration });
  }
}