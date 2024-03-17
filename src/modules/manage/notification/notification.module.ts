import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Notification from "./entities/notification.entity";
import NotificationController from "./notification.controller";
import NotificationService from "./notification.service";
import Event from "../event/entities/event.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Notification, Event])],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService],
})
export class NotificationModule {}
