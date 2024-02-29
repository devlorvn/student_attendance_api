import { Body, Controller, Get, Param, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { CreateEventDto, EventDto, QueryEventDto, UpdateEventDto } from "./dto/event.dto";
import EventService from "./event.service";
import { JwtAdminAuthGuard } from "src/common/guards";
import { ApiCreate, ApiDelete, ApiFindAll, ApiFindOne, ApiUpdate } from "src/common/decorators";
import { PaginationDto } from "src/common/dtos";
import { RequestWithAdmin } from "../auth/authAdmin.interface";
import TopicService from "../topic/topic.service";
import Topic from "../topic/entities/topic.entity";
import Event from "./entities/event.entity";

@Controller("admin/event")
@UseGuards(JwtAdminAuthGuard)
@ApiTags("Event Manage API")
export default class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly topicService: TopicService
  ) {}

  @ApiQuery({
    name: "pageSize",
    type: Number,
    required: false,
    example: 10,
  })
  @ApiQuery({
    name: "page",
    type: Number,
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: "orderBy",
    required: false,
    example: {
      createdAt: "asc",
    },
  })
  @ApiQuery({
    type: QueryEventDto,
  })
  @ApiFindAll("Event", EventDto)
  async getAllEvent(@Query() { pageSize = 10, page = 1, orderBy, ...filters }: PaginationDto & QueryEventDto) {
    // console.log("\x1b[31m%s\x1b[0m", filters);
    // console.log("\x1b[36m%s\x1b[0m", { page, pageSize, orderBy });
    const { topics = [], ...ortherdata } = filters;
    const topicFound: Topic[] = await this.topicService.findByIds(topics);
    const eventfilter = new Event({ ...ortherdata, topics: topicFound });
    return this.eventService.findAll({
      pagination: {
        page: page,
        pageSize: pageSize,
        orderBy: orderBy,
        skip: (page - 1) * pageSize,
      },
      where: eventfilter,
    });
  }

  @ApiCreate("Event", CreateEventDto)
  async createEvent(@Body() event: CreateEventDto, @Req() { user }: RequestWithAdmin) {
    const { topics = [], ...ortherdata } = event;
    const topicFound: Topic[] = await this.topicService.findByIds(topics);
    const newEvent = new Event({ ...ortherdata, createdBy: user.id, topics: topicFound });
    return this.eventService.create(newEvent);
  }

  @ApiUpdate("Event", UpdateEventDto)
  async updateEvent(@Body() event: UpdateEventDto, @Param("id") id: string) {
    const { topics = [], ...ortherdata } = event;
    const topicFound: Topic[] = await this.topicService.findByIds(topics);
    const eventUpdated = new Event({ ...ortherdata, topics: topicFound });
    return this.eventService.updateById(id, eventUpdated);
  }

  @ApiDelete("Event")
  async deleteEvent(@Param("id") id: string) {
    return this.eventService.delete(id);
  }

  @ApiFindOne("Event", EventDto)
  async getEventById(@Param("id") id: string) {
    return this.eventService.findOneById(id);
  }
}
