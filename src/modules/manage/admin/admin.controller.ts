import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import AdminService from "./admin.service";
import { AdminDto, CreateAdminDto, QueryAdminDto, UpdateAdminDto } from "./dto/admin.dto";
import PositionAdminService from "../positionAdmin/positionAdmin.service";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { ApiCreate, ApiDelete, ApiFindAll, ApiFindOne, ApiUpdate } from "src/common/decorators";
import { PaginationDto } from "src/common/dtos";
import { JwtAdminAuthGuard } from "src/common/guards";

@Controller("admin/manage")
@UseGuards(JwtAdminAuthGuard)
@ApiTags("Admin Manage API")
export default class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly adminPositionService: PositionAdminService
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
    type: QueryAdminDto,
  })
  @ApiFindAll("Admin", AdminDto)
  async getAllAdmin(@Query() { pageSize = 10, page = 1, orderBy, ...filters }: PaginationDto & QueryAdminDto) {
    return this.adminService.findAll({
      pagination: {
        page: page,
        pageSize: pageSize,
        orderBy: orderBy,
        skip: (page - 1) * pageSize,
      },
      where: filters,
    });
  }

  @ApiFindOne("Admin", AdminDto)
  async getAdminById(@Param("id") id: string) {
    return this.adminService.findOneById(id);
  }

  @ApiCreate("Admin", CreateAdminDto)
  async createAdmin(@Body() admin: CreateAdminDto) {
    await this.adminPositionService.exist(admin.positionId);
    return this.adminService.create(admin);
  }

  @ApiUpdate("Admin", UpdateAdminDto)
  async updateAdmin(@Body() admin: UpdateAdminDto, @Param("id") id: string) {
    await this.adminPositionService.exist(admin.positionId);
    return this.adminService.updateById(id, admin);
  }

  @ApiDelete("Admin")
  async deleteAdmin(@Param("id") id: string) {
    return this.adminService.delete(id);
  }
}
