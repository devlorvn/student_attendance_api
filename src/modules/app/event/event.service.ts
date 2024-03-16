import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Event from "src/modules/manage/event/entities/event.entity";
import Topic from "src/modules/manage/topic/entities/topic.entity";

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>
  ) {}

  async findAll(page: number = 1, topic?: string) {
    const [events, count] = await this.eventRepository.findAndCount({
      where: {
        topics: {
          id: topic,
        },
      },
      take: 10,
      skip: (page - 1) * 10,
      order: {
        createdAt: "DESC",
      },
      relations: ["topics"],
    });
    return {
      events,
      count,
    };
  }

  findOne(id: string) {
    return this.eventRepository.findOne({
      where: {
        id,
      },
      relations: ["topics"],
    });
  }

  async topics() {
    return this.topicRepository.find({
      select: {
        id: true,
        name: true,
      },
    });
  }
}
