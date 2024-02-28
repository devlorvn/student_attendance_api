import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, FindOptionsOrder, FindOptionsSelect, FindOptionsWhere, ILike, In, Repository } from "typeorm";
import { NullableType } from "src/common/types";
import { ExceptionFactory } from "src/common/exceptions/exceptionsFactory";
import { PaginationDto } from "src/common/dtos";
import Notification from "./entities/notification.entity";
import { CreateNotificationDto } from "./dto/notification.dto";

@Injectable()
export default class NotificationService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>
  ) {}

  // CREATE
  async create(createNotificationDto: CreateNotificationDto) {
    const newNotification = this.notificationRepository.create(createNotificationDto);
    return await this.notificationRepository.save(newNotification);
  }

  // UPDATE BY ID
  async updateById(id: Notification["id"], payload: DeepPartial<Notification>) {
    payload.id = id;
    return await this.notificationRepository.save(payload);
  }

  // UPDATE BY Notification OBJECT
  async update(topic: Notification, payload: DeepPartial<Notification>) {
    return await this.notificationRepository.save(Object.assign(topic, payload));
  }

  // GET ALL
  async findAll({
    pagination,
    where,
    fields,
  }: {
    pagination: PaginationDto;
    where?: FindOptionsWhere<Notification>;
    fields?: FindOptionsSelect<Notification>;
  }): Promise<Notification[]> {
    return await this.notificationRepository.find({
      where: {
        ...where,
        title: where?.title && ILike(`%${where.title}%`),
        content: where?.content && ILike(`%${where.content}%`),
      },
      select: fields,
      take: pagination.pageSize,
      skip: pagination.skip,
      order: pagination.orderBy,
    });
  }

  // GET BY ID
  async findOneById(id: Notification["id"]) {
    const topic = await this.notificationRepository.findOne({ where: { id } });
    if (!topic)
      throw ExceptionFactory.notFoundException({
        message: "Notification không được tìm thấy",
        errorCode: -1,
      });

    return topic;
  }

  // GET ONE BY ANY CLAUSE
  async findOne({
    where,
    fields,
  }: {
    where: FindOptionsWhere<Notification>;
    fields?: FindOptionsSelect<Notification>;
  }): Promise<NullableType<Notification>> {
    return await this.notificationRepository.findOne({
      where: where,
      select: fields,
    });
  }

  // DELETE
  async delete(id: Notification["id"]) {
    const result = await this.notificationRepository.delete(id);
    if (!result.affected) {
      throw ExceptionFactory.notFoundException({
        message: "Notification không được tìm thấy",
        errorCode: -1,
      });
    }
  }

  // FIND BY ID ARRAY
  async findByIds(ids: Notification["id"][]) {
    return await this.notificationRepository.findBy({
      id: In(ids),
    });
  }
}
