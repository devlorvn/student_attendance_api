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

@Module({
  imports: [TypeOrmModule.forFeature([RegisterEvent, Event, Student, Topic])],
  controllers: [RegisterEventController],
  providers: [RegisterEventService, EventService, TopicService],
  exports: [RegisterEventService],
})
export class RegisterEventModule {}
