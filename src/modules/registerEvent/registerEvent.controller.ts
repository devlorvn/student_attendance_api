import { Body, Controller, Delete, Get, HttpStatus, Param, Patch, Post, Put, Query, UseGuards } from "@nestjs/common";
import { ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAdminAuthGuard } from "src/common/guards";
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

@Controller("/admin/register_event")
@ApiTags("Register Event Manage API")
export default class RegisterEventController {
  constructor(
    private readonly registerEventService: RegisterEventService,
    private readonly eventService: EventService
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
  // @UseGuards(JwtAdminAuthGuard)
  // @Get("/admin/register_event")
  @ApiFindAll("RegisterEvent", RegisterEventDto)
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

  // @Get("/admin/register_event/:id")
  @ApiFindOne("RegisterEvent", RegisterEventDto)
  async getRegisterEventById(@Param("id") id: string) {
    return this.registerEventService.findById(id);
  }

  // @Post("/admin/register_event")
  @ApiCreate("RegisterEvent", CreateMultiRegisterEventDto)
  async createMultiRegisterEvent(@Body() registerEvent: CreateMultiRegisterEventDto) {
    const result = await this.registerEventService.createMultiple(registerEvent);
    await this.eventService.changeNumberRegistered(registerEvent.eventId, result.length);
    return result;
  }

  // @Post("/app/register_event")
  // @ApiCreate("RegisterEvent", CreateRegisterEventDto)
  // async createRegisterEvent(@Body() registerEvent: CreateRegisterEventDto) {
  //   const event = await this.eventService.findOneById(registerEvent.eventId);
  //   if (event && event.registration && event.registered < event.amount) {
  //     const result = await this.registerEventService.create(registerEvent);
  //     if (result) {
  //       await this.eventService.changeNumberRegistered(event.id, 1);
  //     }
  //     return result;
  //   } else {
  //     throw ExceptionFactory.badRequestException({
  //       message: "Sự kiện không cho phép người dùng đăng kí",
  //       errorCode: -1,
  //     });
  //   }
  // }

  // @Patch("/admin/register_event")
  @ApiUpdate("RegisterEvent", UpdateRegisterEventDto)
  async updateRegisterEvent(@Param("id") id: string, @Body() registerEvent: UpdateRegisterEventDto) {
    return this.registerEventService.updateById(id, registerEvent);
  }

  // @Delete("/admin/register_event")
  @ApiDelete("RegisterEvent")
  async deleteRegisterEvent(@Param("id") id: string) {
    const registerEvent = await this.registerEventService.findById(id);
    if (typeof registerEvent.eventId == "object") {
      await this.eventService.changeNumberRegistered((registerEvent.eventId as Event).id, -1);
    } else {
      await this.eventService.changeNumberRegistered(registerEvent.eventId, -1);
    }
    await this.registerEventService.delete(id);
  }
}
