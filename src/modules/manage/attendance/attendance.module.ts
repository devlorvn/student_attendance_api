import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Event from "src/modules/manage/event/entities/event.entity";
import { ConfigService } from "@nestjs/config";
import { StorageService } from "src/common/providers/storage.service";
import RegisterEvent from "src/modules/registerEvent/entities/registerEvent.entity";
import { AttendanceController } from "./attendance.controller";
import { AttendanceService } from "./attendance.service";

@Module({
  imports: [TypeOrmModule.forFeature([Event, RegisterEvent])],
  controllers: [AttendanceController],
  providers: [
    AttendanceService,
    ConfigService,
    {
      provide: StorageService,
      useFactory: () => {
        return new StorageService(process.env.S3_PRIVATE_BUCKET);
      },
    },
  ],
})
export class AttendanceModule {}
