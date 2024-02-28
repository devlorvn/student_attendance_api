import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import PositionAdminService from "./positionAdmin.service";
import { CreatePositionAdminDto, PositionAdminDto, QueryPositionAdminDto, UpdatePositionAdminDto } from "./dtos/positionAdmin.dto";
import { ApiQuery, ApiResponse, ApiTags } from "@nestjs/swagger";
import { AdminAuthGuard } from "src/common/guards";
import { ApiCreate, ApiDelete, ApiFindAll, ApiFindOne, ApiUpdate } from "src/common/decorators";
import { PaginationDto } from "src/common/dtos";

@Controller("admin/positions")
// @UseGuards(AdminAuthGuard)
@ApiTags("Admin Position Manage API")
export default class PositionAdminController {
  constructor(private readonly positionAdminService: PositionAdminService) {}

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
    type: QueryPositionAdminDto,
  })
  @ApiFindAll("Position", PositionAdminDto)
  async getAllPositionAdmin(@Query() { pageSize = 10, page = 1, orderBy, ...filters }: PaginationDto & QueryPositionAdminDto) {
    return this.positionAdminService.findAll({
      pagination: {
        page: page,
        pageSize: pageSize,
        orderBy: orderBy,
        skip: (page - 1) * pageSize,
      },
      where: filters,
    });
  }

  @ApiFindOne("Position", PositionAdminDto)
  async getPositionAdminById(@Param("id") id: string) {
    return this.positionAdminService.findById(id);
  }

  @ApiCreate("Position", CreatePositionAdminDto)
  async createPositionAdmin(@Body() position: CreatePositionAdminDto) {
    return this.positionAdminService.create(position);
  }

  @ApiUpdate("Position", UpdatePositionAdminDto)
  async updatePositionAdmin(@Param("id") id: string, @Body() position: UpdatePositionAdminDto) {
    return this.positionAdminService.updateById(id, position);
  }

  @ApiDelete("Position")
  async deletePositionAdmin(@Param("id") id: string) {
    return this.positionAdminService.delete(id);
  }
}
