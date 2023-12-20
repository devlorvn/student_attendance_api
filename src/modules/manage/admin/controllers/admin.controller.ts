import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import AdminService from "../admin.service";
import { CreateAdminDto, UpdateAdminDto } from "../dto/admin.dto";
import PositionAdminService from "../../positionAdmin/positionAdmin.service";
import { ApiTags } from "@nestjs/swagger";

@Controller("admin/manage")
@ApiTags("Admin Manage API")
export default class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly adminPositionService: PositionAdminService
  ) {}

  @Get()
  async getAllAdmin() {
    return this.adminService.getAllAdmin();
  }

  @Get(":id")
  async getAdminById(@Param("id") id: string) {
    return this.adminService.getAdminById(id);
  }

  @Post()
  async createAdmin(@Body() admin: CreateAdminDto) {
    await this.adminPositionService.existPositionAdmin(admin.positionId);
    return this.adminService.createAdmin(admin);
  }

  @Put(":id")
  async updateAdmin(@Body() admin: UpdateAdminDto) {
    await this.adminPositionService.existPositionAdmin(admin.positionId);
    const { id, ...data } = admin;
    return this.adminService.updateAdmin(id, data);
  }

  @Delete(":id")
  async deleteAdmin(@Param("id") id: string) {
    return this.adminService.deleteAdmin(id);
  }
}
