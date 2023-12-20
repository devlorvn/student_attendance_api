import { Body, Controller, Delete, Get, HttpStatus, Param, Post, Put } from "@nestjs/common";
import PositionAdminService from "./positionAdmin.service";
import { CreatePositionAdminDto, UpdatePositionAdminDto } from "./dtos/positionAdmin.dto";
import { ApiResponse, ApiTags } from "@nestjs/swagger";

@Controller("admin/positions/manage")
@ApiTags("Admin Position Manage API")
export default class PositionAdminController {
  constructor(private readonly positionAdminService: PositionAdminService) {}

  @Get()
  async getAllPositionAdmin() {
    return this.positionAdminService.getAllPositionAdmin();
  }

  @Get(":id")
  async getPositionAdminById(@Param("id") id: string) {
    return this.positionAdminService.getPositionAdminById(id);
  }

  @Post()
  async createPositionAdmin(@Body() position: CreatePositionAdminDto) {
    return this.positionAdminService.createPositionAdmin(position);
  }

  @Put(":id")
  async updatePositionAdmin(@Body() position: UpdatePositionAdminDto) {
    return this.positionAdminService.updatePositionAdmin(position);
  }

  @Delete(":id")
  async deletePositionAdmin(@Param("id") id: string) {
    return this.positionAdminService.deletePositionAdmin(id);
  }
}
