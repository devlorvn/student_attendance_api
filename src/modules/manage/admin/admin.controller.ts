import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import AdminService from "./admin.service";
import { CreateAdminDto, UpdateAdminDto } from "./dto/admin.dto";
import PositionAdminService from "../positionAdmin/positionAdmin.service";

@Controller("admin")
export default class AdminController {
  constructor(
    private readonly adminService: AdminService,
    private readonly adminPositionService: PositionAdminService
  ) {}

  @Get()
  getAllAdmin() {
    return this.adminService.getAllAdmin();
  }

  @Get(":id")
  getAdminById(@Param("id") id: string) {
    return this.adminService.getAdminById(id);
  }

  @Post()
  createAdmin(@Body() admin: CreateAdminDto) {
    this.adminPositionService.existPositionAdmin(admin.positionId);
    return this.adminService.createAdmin(admin);
  }

  @Put(":id")
  updateAdmin(@Body() admin: UpdateAdminDto) {
    if (admin.positionId) this.adminPositionService.existPositionAdmin(admin.positionId);
    return this.adminService.updateAdmin(admin);
  }

  @Delete(":id")
  deleteAdmin(@Param("id") id: string) {
    return this.adminService.deleteAdmin(id);
  }
}
