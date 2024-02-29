import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, FindOptionsOrder, FindOptionsSelect, FindOptionsWhere, ILike, In, Repository } from "typeorm";
import { NullableType } from "src/common/types";
import { CreateEventDto, EventDto, UpdateEventDto } from "./dto/event.dto";
import Event from "./entities/event.entity";
import { ExceptionFactory } from "src/common/exceptions/exceptionsFactory";
import { PaginationDto } from "src/common/dtos";
import TopicService from "../topic/topic.service";

@Injectable()
export default class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    private topicService: TopicService
  ) {}

  // CREATE
  async create(createEventDto: DeepPartial<Event>) {
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
    const event = await this.eventRepository.findOne({ where: { id }, relations: ["topics", "registers", "registers.mssv"] });
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

  // CHANGE COUNT REGISTER
  /**
   * @param id - ID event to update
   * @param amount - greater than 0 to add, less than 0 to deduct
   * @returns void
   */
  async changeNumberRegistered(id: Event["id"], amount: number) {
    const result = await this.eventRepository
      .createQueryBuilder("event")
      .update(Event)
      .set({
        registered: () => `GREATEST("registered" + ${amount}, 0)`,
      })
      .where("id = :id", { id })
      .execute();

    if (!result.affected) {
      throw ExceptionFactory.badRequestException({
        message: `Event với id = ${id} không được tìm thấy hoặc không thể cập nhật`,
        errorCode: -1,
      });
    }
  }

  // CHANGE ENABLE STATUS
  async changeEnableState(id: Event["id"], enable: boolean) {
    await this.updateById(id, { enable });
  }

  // CHANGE REGISTRATION STATUS
  async changeRegistrationState(id: Event["id"], registration: boolean) {
    await this.updateById(id, { registration });
  }
}
