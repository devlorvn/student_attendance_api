import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from "@nestjs/common";
import { EventService } from "./event.service";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/guards";
import { ListEventDto } from "./dto/list-event.dto";

@Controller("app/event")
@ApiTags("Event")
@UseGuards(JwtAuthGuard)
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  findAll(@Query() { page, topic }: ListEventDto) {
    return this.eventService.findAll(page, topic);
  }

  @Get("topics")
  topics() {
    return this.eventService.topics();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.eventService.findOne(id);
  }
}
