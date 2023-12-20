import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Admin from "./entities/admin.entity";
import AdminController from "./controllers/admin.controller";
import AdminService from "./admin.service";
import { PositionAdminModule } from "../positionAdmin/positionAdmin.module";
import PositionAdminService from "../positionAdmin/positionAdmin.service";
import PositionAdmin from "../positionAdmin/entities/positionAdmin.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Admin, PositionAdmin]), PositionAdminModule],
  controllers: [AdminController],
  providers: [AdminService, PositionAdminService],
  exports: [AdminService],
})
export class AdminModule {}
