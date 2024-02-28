import { Body, Controller, Param, Query, Req, UseGuards } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { JwtAdminAuthGuard } from "src/common/guards";
import { ApiCreate, ApiDelete, ApiFindAll, ApiFindOne, ApiUpdate } from "src/common/decorators";
import { PaginationDto } from "src/common/dtos";
import NotificationUserService from "./notificationUser.service";
import { CreateNotificationUserDto, NotificationUserDto, QueryNotificationUserDto, UpdateNotificationUserDto } from "./dto/notificationUser.dto";

@Controller("admin/notification_user")
@UseGuards(JwtAdminAuthGuard)
@ApiTags("NotificationUser Manage API")
export default class NotificationUserController {
  constructor(private readonly notificationUserService: NotificationUserService) {}

  @ApiFindOne("NotificationUser", NotificationUserDto)
  async getEventById(@Param("id") id: string) {
    return this.notificationUserService.findOneById(id);
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
    type: QueryNotificationUserDto,
  })
  @ApiFindAll("NotificationUser", NotificationUserDto)
  async getAllNotificationUser(@Query() { pageSize = 10, page = 1, orderBy, ...filters }: PaginationDto & QueryNotificationUserDto) {
    // console.log("\x1b[31m%s\x1b[0m", filters);
    // console.log("\x1b[36m%s\x1b[0m", { page, pageSize, orderBy });
    return this.notificationUserService.findAll({
      pagination: {
        page: page,
        pageSize: pageSize,
        orderBy: orderBy,
        skip: (page - 1) * pageSize,
      },
      where: filters,
    });
  }

  @ApiCreate("NotificationUser", CreateNotificationUserDto)
  async createEvent(@Body() event: CreateNotificationUserDto) {
    return this.notificationUserService.create(event);
  }

  @ApiUpdate("NotificationUser", UpdateNotificationUserDto)
  async updateEvent(@Body() event: UpdateNotificationUserDto, @Param("id") id: string) {
    return this.notificationUserService.updateById(id, event);
  }

  @ApiDelete("NotificationUser")
  async deleteEvent(@Param("id") id: string) {
    return this.notificationUserService.delete(id);
  }
}
