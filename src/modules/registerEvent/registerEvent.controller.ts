import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAdminAuthGuard, JwtAuthGuard } from "src/common/guards";
import { ApiCreate, ApiDelete, ApiFindAll, ApiFindOne, ApiUpdate } from "src/common/decorators";
import { PaginationDto } from "src/common/dtos";
import {
  CreateMultiRegisterEventDto,
  CreateRegisterEventDto,
  QueryRegisterEventDto,
  RegisterEventDto,
  UpdateRegisterEventDto,
} from "./dto/registerEvent.dto";
import RegisterEventService from "./registerEvent.service";
import EventService from "../manage/event/event.service";
import { ExceptionFactory } from "src/common/exceptions/exceptionsFactory";
import Event from "../manage/event/entities/event.entity";
import NotificationService from "../manage/notification/notification.service";
import NotificationUserService from "../manage/notificationUser/notificationUser.service";
import { Student } from "../student/entities/student.entity";

@Controller()
@ApiTags("Register Event Manage API")
export default class RegisterEventController {
  constructor(
    private readonly registerEventService: RegisterEventService,
    private readonly eventService: EventService,
    private readonly notificationService: NotificationService,
    private readonly notificationUserService: NotificationUserService
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
    type: QueryRegisterEventDto,
  })
  @UseGuards(JwtAdminAuthGuard)
  @Get("/admin/register_event")
  async getAllRegisterEvent(@Query() { pageSize = 10, page = 1, orderBy, ...filters }: PaginationDto & QueryRegisterEventDto) {
    return this.registerEventService.findAll({
      pagination: {
        page: page,
        pageSize: pageSize,
        orderBy: orderBy,
        skip: (page - 1) * pageSize,
      },
      where: filters,
    });
  }

  @UseGuards(JwtAdminAuthGuard)
  @Get("/admin/register_event/:id")
  async getRegisterEventById(@Param("id") id: string) {
    return this.registerEventService.findById(id);
  }

  @UseGuards(JwtAdminAuthGuard)
  @Post("/admin/register_event")
  async createMultiRegisterEvent(@Body() registerEvent: CreateMultiRegisterEventDto) {
    const result = await this.registerEventService.createMultiple(registerEvent);
    await this.eventService.changeNumberRegistered(registerEvent.eventId, result.length);
    const eventFound = await this.eventService.findOneById(registerEvent.eventId);
    let foundNoti = await this.notificationService.findOne({ where: { eventId: eventFound.id } });
    if (!foundNoti) foundNoti = await this.notificationService.createDefault({ eventId: eventFound.id, eventTitle: eventFound.title });
    await this.notificationUserService.createMultiple({ mssv: registerEvent.mssv, notificationId: foundNoti.id });
    return result;
  }

  @UseGuards(JwtAdminAuthGuard)
  @Patch("/admin/register_event/:id")
  async updateRegisterEvent(@Param("id") id: string, @Body() registerEvent: UpdateRegisterEventDto) {
    return this.registerEventService.updateById(id, registerEvent);
  }

  @UseGuards(JwtAdminAuthGuard)
  @Delete("/admin/register_event/:id")
  async deleteRegisterEvent(@Param("id") id: string) {
    const registerEvent = await this.registerEventService.findById(id);
    if (typeof registerEvent.eventId == "object") {
      await this.eventService.changeNumberRegistered((registerEvent.eventId as Event).id, -1);
      if (typeof registerEvent.mssv == "object") {
        await this.notificationUserService.deleteNoti((registerEvent.mssv as Student).mssv, (registerEvent.eventId as Event).id);
      } else {
        await this.notificationUserService.deleteNoti(registerEvent.mssv, (registerEvent.eventId as Event).id);
      }
    } else {
      await this.eventService.changeNumberRegistered(registerEvent.eventId, -1);
      if (typeof registerEvent.mssv == "object") {
        await this.notificationUserService.deleteNoti((registerEvent.mssv as Student).mssv, registerEvent.eventId);
      } else {
        await this.notificationUserService.deleteNoti(registerEvent.mssv, registerEvent.eventId);
      }
    }

    await this.registerEventService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Post("/app/register_event")
  async createRegisterEvent(@Body() registerEvent: CreateRegisterEventDto) {
    const event = await this.eventService.findOneById(registerEvent.eventId);
    if (event && event.registration && event.registered < event.amount && event.endRegistrationDate < new Date()) {
      const result = await this.registerEventService.create(registerEvent);
      if (result) {
        await this.eventService.changeNumberRegistered(event.id, 1);
      }
      return result;
    } else {
      throw ExceptionFactory.badRequestException({
        message: "Sự kiện không cho phép người dùng đăng kí hoặc đã quá hạn đăng kí",
        errorCode: -1,
      });
    }
  }
}
