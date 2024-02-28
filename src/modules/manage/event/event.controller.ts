import { Body, Controller, Param, Query, Req, UseGuards } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { CreateEventDto, EventDto, QueryEventDto, UpdateEventDto } from "./dto/event.dto";
import EventService from "./event.service";
import { JwtAdminAuthGuard } from "src/common/guards";
import { ApiCreate, ApiDelete, ApiFindAll, ApiFindOne, ApiUpdate } from "src/common/decorators";
import { PaginationDto } from "src/common/dtos";
import { RequestWithAdmin } from "../auth/authAdmin.interface";

@Controller("admin/event/manage")
@UseGuards(JwtAdminAuthGuard)
@ApiTags("Event Manage API")
export default class EventController {
  constructor(private readonly eventService: EventService) {}

  @ApiFindOne("Event", EventDto)
  async getEventById(@Param("id") id: string) {
    return this.eventService.findOneById(id);
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
  @ApiFindAll("Event", EventDto)
  async getAllEvent(@Query() { pageSize = 10, page = 1, orderBy, ...filters }: PaginationDto & QueryEventDto) {
    // console.log("\x1b[31m%s\x1b[0m", filters);
    // console.log("\x1b[36m%s\x1b[0m", { page, pageSize, orderBy });
    return this.eventService.findAll({
      pagination: {
        page: page,
        pageSize: pageSize,
        orderBy: orderBy,
        skip: (page - 1) * pageSize,
      },
      where: filters,
    });
  }

  @ApiCreate("Event", CreateEventDto)
  async createEvent(@Body() event: CreateEventDto, @Req() { user }: RequestWithAdmin) {
    event.createdBy = user.id;
    return this.eventService.create(event);
  }

  @ApiUpdate("Event", UpdateEventDto)
  async updateEvent(@Body() event: UpdateEventDto, @Param("id") id: string) {
    // console.log("\x1b[36m%s\x1b[0m", { page, pageSize, orderBy });
    return this.eventService.updateById(id, event);
  }

  @ApiDelete("Event")
  async deleteEvent(@Param("id") id: string) {
    return this.eventService.delete(id);
  }
}
