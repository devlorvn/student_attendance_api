import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put, UseGuards } from "@nestjs/common";
import PositionAdminService from "./positionAdmin.service";
import { CreatePositionAdminDto, UpdatePositionAdminDto } from "./dtos/positionAdmin.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { AdminAuthGuard } from "src/common/guards";

@Controller("admin/positions/manage")
// @UseGuards(AdminAuthGuard)
@ApiTags("Admin Position Manage API")
export default class PositionAdminController {
  constructor(private readonly positionAdminService: PositionAdminService) {}

  @Get()
  async getAllPositionAdmin() {
    return this.positionAdminService.findAll();
  }

  @Get(":id")
  async getPositionAdminById(@Param("id") id: string) {
    return this.positionAdminService.findById(id);
  }

  @Post()
  async createPositionAdmin(@Body() position: CreatePositionAdminDto) {
    return this.positionAdminService.create(position);
  }

  @Put(":id")
  async updatePositionAdmin(@Body() position: UpdatePositionAdminDto) {
    return this.positionAdminService.update(position);
  }

  @Delete(":id")
  async deletePositionAdmin(@Param("id") id: string) {
    return this.positionAdminService.delete(id);
  }
}
