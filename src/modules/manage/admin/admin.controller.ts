import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import AdminService from "./admin.service";
import { CreateAdminDto, UpdateAdminDto } from "./dto/admin.dto";
import PositionAdminService from "../positionAdmin/positionAdmin.service";
import { ApiTags } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

@Controller("admin/manage")
// @UseGuards(AuthGuard("admin"))
@ApiTags("Admin Manage API")
export default class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly adminPositionService: PositionAdminService
  ) {}

  @Get()
  async getAllAdmin() {
    return this.adminService.findAll();
  }

  @Get(":id")
  async getAdminById(@Param("id") id: string) {
    return this.adminService.findOneById(id);
  }

  @Post()
  async createAdmin(@Body() admin: CreateAdminDto) {
    await this.adminPositionService.exist(admin.positionId);
    return this.adminService.create(admin);
  }

  @Put(":id")
  async updateAdmin(@Body() admin: UpdateAdminDto) {
    await this.adminPositionService.exist(admin.positionId);
    const { id, ...data } = admin;
    return this.adminService.updateById(id, data);
  }

  @Delete(":id")
  async deleteAdmin(@Param("id") id: string) {
    return this.adminService.delete(id);
  }
}
