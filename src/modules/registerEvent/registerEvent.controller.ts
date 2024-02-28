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

@Controller()
@ApiTags("Register Event Manage API")
export default class RegisterEventController {
  constructor(private readonly registerEventService: RegisterEventService) {}

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

  @Get("/admin/register_event/:id")
  @ApiFindOne("RegisterEvent", RegisterEventDto)
  async getRegisterEventById(@Param("id") id: string) {
    return this.registerEventService.findById(id);
  }

  @Post("/admin/register_event")
  @ApiCreate("RegisterEvent", CreateMultiRegisterEventDto)
  async createMultiRegisterEvent(@Body() registerEvent: CreateMultiRegisterEventDto) {
    return this.registerEventService.createMultiple(registerEvent);
  }

  @Post("/app/register_event")
  @ApiCreate("RegisterEvent", CreateRegisterEventDto)
  async createRegisterEvent(@Body() registerEvent: CreateRegisterEventDto) {
    return this.registerEventService.create(registerEvent);
  }

  @Patch("/admin/register_event")
  @ApiUpdate("RegisterEvent", UpdateRegisterEventDto)
  async updateRegisterEvent(@Param("id") id: string, @Body() registerEvent: UpdateRegisterEventDto) {
    return this.registerEventService.updateById(id, registerEvent);
  }

  @Delete("/admin/register_event")
  @ApiDelete("RegisterEvent")
  async deleteRegisterEvent(@Param("id") id: string) {
    return this.registerEventService.delete(id);
  }
}
