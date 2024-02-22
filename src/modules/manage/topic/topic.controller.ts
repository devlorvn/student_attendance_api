import { Body, Controller, Param, Query, Req, UseGuards } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { JwtAdminAuthGuard } from "src/common/guards";
import { ApiCreate, ApiDelete, ApiFindAll, ApiFindOne, ApiUpdate } from "src/common/decorators";
import { PaginationDto } from "src/common/dtos";
import { CreateTopicDto, QueryTopicDto, TopicDto, UpdateTopicDto } from "./dto/topic.dto";
import TopicService from "./topic.service";

@Controller("admin/topic/manage")
@UseGuards(JwtAdminAuthGuard)
@ApiTags("Topic Manage API")
export default class TopicController {
  constructor(private readonly topicService: TopicService) {}

  @ApiFindOne("Event", TopicDto)
  async getEventById(@Param("id") id: string) {
    return this.topicService.findOneById(id);
  }

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
  @ApiFindAll("Topic", TopicDto)
  async getAllTopic(@Query() { pageSize = 10, page = 1, orderBy, ...filters }: PaginationDto & QueryTopicDto) {
    // console.log("\x1b[31m%s\x1b[0m", filters);
    // console.log("\x1b[36m%s\x1b[0m", { page, pageSize, orderBy });
    return this.topicService.findAll({
      pagination: {
        page: page,
        pageSize: pageSize,
        orderBy: orderBy,
        skip: (page - 1) * pageSize,
      },
      where: filters,
    });
  }

  @ApiCreate("Topic", CreateTopicDto)
  async createEvent(@Body() event: CreateTopicDto) {
    return this.topicService.create(event);
  }

  @ApiUpdate("Topic", UpdateTopicDto)
  async updateEvent(@Body() event: UpdateTopicDto, @Param("id") id: string) {
    return this.topicService.updateById(id, event);
  }

  @ApiDelete("Topic")
  async deleteEvent(@Param("id") id: string) {
    return this.topicService.delete(id);
  }
}
