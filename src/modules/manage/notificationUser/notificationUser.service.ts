import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, FindOptionsOrder, FindOptionsSelect, FindOptionsWhere, ILike, In, Repository } from "typeorm";
import { NullableType } from "src/common/types";
import { ExceptionFactory } from "src/common/exceptions/exceptionsFactory";
import { PaginationDto } from "src/common/dtos";
import NotificationUser from "./entities/notificationUser.entity";
import { CreateNotificationUserDto } from "./dto/notificationUser.dto";

@Injectable()
export default class NotificationUserService {
  constructor(
    @InjectRepository(NotificationUser)
    private notificationUserRepository: Repository<NotificationUser>
  ) {}

  // CREATE
  async create(createNotificationUserDto: CreateNotificationUserDto) {
    const newNotificationUser = this.notificationUserRepository.create(createNotificationUserDto);
    return await this.notificationUserRepository.save(newNotificationUser);
  }

  // UPDATE BY ID
  async updateById(id: NotificationUser["id"], payload: DeepPartial<NotificationUser>) {
    payload.id = id;
    return await this.notificationUserRepository.save(payload);
  }

  // UPDATE BY NotificationUser OBJECT
  async update(topic: NotificationUser, payload: DeepPartial<NotificationUser>) {
    return await this.notificationUserRepository.save(Object.assign(topic, payload));
  }

  // GET ALL
  async findAll({
    pagination,
    where,
    fields,
  }: {
    pagination: PaginationDto;
    where?: FindOptionsWhere<NotificationUser>;
    fields?: FindOptionsSelect<NotificationUser>;
  }): Promise<NotificationUser[]> {
    return await this.notificationUserRepository.find({
      where: {
        ...where,
      },
      select: fields,
      take: pagination.pageSize,
      skip: pagination.skip,
      order: pagination.orderBy,
    });
  }

  // GET BY ID
  async findOneById(id: NotificationUser["id"]) {
    const topic = await this.notificationUserRepository.findOne({ where: { id } });
    if (!topic)
      throw ExceptionFactory.notFoundException({
        message: "NotificationUser không được tìm thấy",
        errorCode: -1,
      });

    return topic;
  }

  // GET ONE BY ANY CLAUSE
  async findOne({
    where,
    fields,
  }: {
    where: FindOptionsWhere<NotificationUser>;
    fields?: FindOptionsSelect<NotificationUser>;
  }): Promise<NullableType<NotificationUser>> {
    return await this.notificationUserRepository.findOne({
      where: where,
      select: fields,
    });
  }

  // DELETE
  async delete(id: NotificationUser["id"]) {
    const result = await this.notificationUserRepository.delete(id);
    if (!result.affected) {
      throw ExceptionFactory.notFoundException({
        message: "NotificationUser không được tìm thấy",
        errorCode: -1,
      });
    }
  }

  // FIND BY ID ARRAY
  async findByIds(ids: NotificationUser["id"][]) {
    return await this.notificationUserRepository.findBy({
      id: In(ids),
    });
  }
}
