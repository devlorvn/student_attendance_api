import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Admin from "../admin/entities/admin.entity";
import Event from "./entities/event.entity";
import EventController from "./event.controller";
import EventService from "./event.service";
import Topic from "../topic/entities/topic.entity";
import TopicService from "../topic/topic.service";
import Notification from "../notification/entities/notification.entity";
import NotificationService from "../notification/notification.service";

@Module({
  imports: [TypeOrmModule.forFeature([Admin, Event, Topic, Notification])],
  controllers: [EventController],
  providers: [EventService, TopicService, NotificationService],
  exports: [EventService],
})
export class EventModule {}
