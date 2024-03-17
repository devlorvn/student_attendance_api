import { Controller, Get, Param, UseGuards, Query, Req } from "@nestjs/common";
import { EventService } from "./event.service";
import { ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/guards";
import { ListEventDto } from "./dto/list-event.dto";
import { RequestWithUser } from "../auth/auth.interface";

@Controller("app/event")
@ApiTags("Event")
@UseGuards(JwtAuthGuard)
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Get()
  findAll(@Query() query: ListEventDto, @Req() req: RequestWithUser) {
    return this.eventService.findAll(req.user.mssv, query);
  }

  @Get("topics")
  topics() {
    return this.eventService.topics();
  }

  @Get("/registered")
  findRegistered(@Req() req: RequestWithUser) {
    return this.eventService.registered(req.user.mssv);
  }

  @Get(":id")
  findOne(@Param("id") id: string, @Req() req: RequestWithUser) {
    return this.eventService.findOne(req.user.mssv, id);
  }
}
