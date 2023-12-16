import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import PositionAdmin from "./entities/positionAdmin.entity";
import PositionAdminController from "./positionAdmin.controller";
import PositionAdminService from "./positionAdmin.service";

@Module({
  imports: [TypeOrmModule.forFeature([PositionAdmin])],
  controllers: [PositionAdminController],
  providers: [PositionAdminService],
  exports: [PositionAdminService],
})
export class PositionAdminModule {}
