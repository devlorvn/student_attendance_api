import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import RegisterEvent from "./entities/registerEvent.entity";
import { Student } from "../student/entities/student.entity";
import Event from "../manage/event/entities/event.entity";
import RegisterEventService from "./registerEvent.service";
import RegisterEventController from "./registerEvent.controller";
import EventService from "../manage/event/event.service";
import TopicService from "../manage/topic/topic.service";
import Topic from "../manage/topic/entities/topic.entity";
import NotificationService from "../manage/notification/notification.service";
import Notification from "../manage/notification/entities/notification.entity";
import NotificationUserService from "../manage/notificationUser/notificationUser.service";
import NotificationUser from "../manage/notificationUser/entities/notificationUser.entity";

@Module({
  imports: [TypeOrmModule.forFeature([RegisterEvent, Event, Student, Topic, Notification, NotificationUser])],
  controllers: [RegisterEventController],
  providers: [RegisterEventService, EventService, TopicService, NotificationService, NotificationUserService],
  exports: [RegisterEventService],
})
export class RegisterEventModule {}
