import { Controller, Get, Param, UseGuards, Query, Req, Patch, UseInterceptors, UploadedFile, Body } from "@nestjs/common";
import { EventService } from "./event.service";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/common/guards";
import { ListEventDto } from "./dto/list-event.dto";
import { RequestWithUser } from "../auth/auth.interface";
import { FileInterceptor } from "@nestjs/platform-express";
import { ExceptionFactory } from "src/common/exceptions/exceptionsFactory";

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

  @Patch("/attendance")
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      required: ["eventId", "file"],
      type: "object",
      properties: {
        eventId: {
          type: "string",
        },
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor("file"))
  async attendanceEvent(@UploadedFile() file: Express.Multer.File, @Body("eventId") eventId: string, @Req() { user }: RequestWithUser) {
    const timestamp = Date.now();
    const newFileName = `${file.originalname}_${timestamp}`;
    const result = await this.eventService.uploadFilePrivate(file.buffer, newFileName);
    if (result) {
      return this.eventService.updateAttendance(user.mssv, eventId, result.url);
    }
    return ExceptionFactory.badRequestException({
      message: "Lỗi",
      errorCode: -1,
    });
  }
}
