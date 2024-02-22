import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, FindOptionsOrder, FindOptionsSelect, FindOptionsWhere, ILike, Repository } from "typeorm";
import { NullableType } from "src/common/types";
import { CreateTopicDto } from "./dto/topic.dto";
import Topic from "./entities/topic.entity";
import { ExceptionFactory } from "src/common/exceptions/exceptionsFactory";
import { PaginationDto } from "src/common/dtos";

@Injectable()
export default class TopicService {
  constructor(
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>
  ) {}

  // CREATE
  async create(createTopicDto: CreateTopicDto) {
    const newTopic = this.topicRepository.create(createTopicDto);
    return await this.topicRepository.save(newTopic);
  }

  // UPDATE BY ID
  async updateById(id: Topic["id"], payload: DeepPartial<Topic>) {
    payload.id = id;
    return await this.topicRepository.save(payload);
  }

  // UPDATE BY Topic OBJECT
  async update(topic: Topic, payload: DeepPartial<Topic>) {
    return await this.topicRepository.save(Object.assign(topic, payload));
  }

  // GET ALL
  async findAll({
    pagination,
    where,
    fields,
  }: {
    pagination: PaginationDto;
    where?: FindOptionsWhere<Topic>;
    fields?: FindOptionsSelect<Topic>;
  }): Promise<Topic[]> {
    return await this.topicRepository.find({
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
  async findOneById(id: Topic["id"]) {
    const topic = await this.topicRepository.findOne({ where: { id } });
    if (!topic)
      throw ExceptionFactory.notFoundException({
        message: "Topic không được tìm thấy",
        errorCode: -1,
      });

    return topic;
  }

  // GET ONE BY ANY CLAUSE
  async findOne({ where, fields }: { where: FindOptionsWhere<Topic>; fields?: FindOptionsSelect<Topic> }): Promise<NullableType<Topic>> {
    return await this.topicRepository.findOne({
      where: where,
      select: fields,
    });
  }

  // DELETE
  async delete(id: Topic["id"]) {
    const result = await this.topicRepository.delete(id);
    if (!result.affected) {
      throw ExceptionFactory.notFoundException({
        message: "Topic không được tìm thấy",
        errorCode: -1,
      });
    }
  }
}
