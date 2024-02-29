import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import NotificationUser from "./entities/notificationUser.entity";
import NotificationUserController from "./notificationUser.controller";
import NotificationUserService from "./notificationUser.service";

@Module({
  imports: [TypeOrmModule.forFeature([NotificationUser])],
  controllers: [NotificationUserController],
  providers: [NotificationUserService],
  exports: [NotificationUserService],
})
export class NotificationUserModule {}
