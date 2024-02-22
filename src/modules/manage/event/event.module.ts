import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Admin from "../admin/entities/admin.entity";
import Event from "./entities/event.entity";
import EventController from "./event.controller";
import EventService from "./event.service";
import Topic from "../topic/entities/topic.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Admin, Event, Topic])],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
