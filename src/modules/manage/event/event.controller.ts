import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CreateEventDto, UpdateEventDto } from "./dto/event.dto";
import EventService from "./event.service";
import { AdminAuthGuard } from "src/common/guards";

@Controller("admin/event/manage")
@UseGuards(AdminAuthGuard)
@ApiTags("Event Manage API")
export default class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  async getAllEvent(@Query() { limit = 10, page = 1 }: { limit?: number; page?: number }) {
    return this.eventService.findAll({ limit, page });
  }

  @Post()
  @HttpCode(HttpStatus.OK)
  async filterEvent() {}

  @Get(":id")
  async getEventById(@Param("id") id: string) {
    return this.eventService.findOneById(id);
  }

  @Post()
  async createEvent(@Body() event: CreateEventDto) {
    return this.eventService.create(event);
  }

  @Put(":id")
  async updateEvent(@Body() event: UpdateEventDto) {
    const { id, ...data } = event;
    return this.eventService.updateById(id, data);
  }

  @Delete(":id")
  async deleteEvent(@Param("id") id: string) {
    return this.eventService.delete(id);
  }
}
