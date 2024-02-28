import { Body, Controller, Param, Query, Req, UseGuards } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { JwtAdminAuthGuard } from "src/common/guards";
import { ApiCreate, ApiDelete, ApiFindAll, ApiFindOne, ApiUpdate } from "src/common/decorators";
import { PaginationDto } from "src/common/dtos";
import NotificationService from "./notification.service";
import { CreateNotificationDto, NotificationDto, QueryNotificationDto, UpdateNotificationDto } from "./dto/notification.dto";

@Controller("admin/notification")
@UseGuards(JwtAdminAuthGuard)
@ApiTags("Notification Manage API")
export default class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @ApiFindOne("Notification", NotificationDto)
  async getEventById(@Param("id") id: string) {
    return this.notificationService.findOneById(id);
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
  @ApiQuery({
    type: QueryNotificationDto,
  })
  @ApiFindAll("Notification", NotificationDto)
  async getAllNotification(@Query() { pageSize = 10, page = 1, orderBy, ...filters }: PaginationDto & QueryNotificationDto) {
    // console.log("\x1b[31m%s\x1b[0m", filters);
    // console.log("\x1b[36m%s\x1b[0m", { page, pageSize, orderBy });
    return this.notificationService.findAll({
      pagination: {
        page: page,
        pageSize: pageSize,
        orderBy: orderBy,
        skip: (page - 1) * pageSize,
      },
      where: filters,
    });
  }

  @ApiCreate("Notification", CreateNotificationDto)
  async createEvent(@Body() event: CreateNotificationDto) {
    return this.notificationService.create(event);
  }

  @ApiUpdate("Notification", UpdateNotificationDto)
  async updateEvent(@Body() event: UpdateNotificationDto, @Param("id") id: string) {
    return this.notificationService.updateById(id, event);
  }

  @ApiDelete("Notification")
  async deleteEvent(@Param("id") id: string) {
    return this.notificationService.delete(id);
  }
}
