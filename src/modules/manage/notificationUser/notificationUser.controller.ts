import { Body, Controller, Delete, Get, Param, Patch, Post, Query, Req, UseGuards } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { JwtAdminAuthGuard, JwtAuthGuard } from "src/common/guards";
import { PaginationDto } from "src/common/dtos";
import NotificationUserService from "./notificationUser.service";
import { MarkAsReadDto, QueryNotificationUserDto } from "./dto/notificationUser.dto";
import { RequestWithUser } from "src/modules/app/auth/auth.interface";

@Controller("app/notification_user")
@UseGuards(JwtAuthGuard)
@ApiTags("NotificationUser API")
export default class NotificationUserController {
  constructor(private readonly notificationUserService: NotificationUserService) {}

  // @ApiFindOne("NotificationUser", NotificationUserDto)
  // async getEventById(@Param("id") id: string) {
  //   return this.notificationUserService.findOneById(id);
  // }

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
  @Get()
  async getAllNotificationUser(
    @Query() { pageSize, page, orderBy, ...filters }: PaginationDto & QueryNotificationUserDto,
    @Req() { user }: RequestWithUser
  ) {
    // console.log("\x1b[31m%s\x1b[0m", filters);
    // console.log("\x1b[36m%s\x1b[0m", { page, pageSize, orderBy });
    return this.notificationUserService.findAll({
      pagination: {
        page: page,
        pageSize: pageSize,
        orderBy: orderBy,
        skip: (page - 1) * pageSize || 0,
      },
      where: {
        ...filters,
        mssv: user.mssv,
      },
    });
  }

  @Patch("/mark_read_all")
  async markAsReadAll(@Req() req: RequestWithUser) {
    return await this.notificationUserService.markAsReadAll(req.user.mssv);
  }

  @Patch("/mark_read")
  async markAsRead(@Body() payload: MarkAsReadDto) {
    return await this.notificationUserService.markAsRead(payload.seen, payload.id);
  }

  @Delete("/all")
  async deteleAllRead(@Req() req: RequestWithUser) {
    return await this.notificationUserService.deteleAllRead(req.user.mssv);
  }
}
