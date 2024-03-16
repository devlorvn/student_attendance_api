import { Module } from "@nestjs/common";
import { EventService } from "./event.service";
import { EventController } from "./event.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import Event from "src/modules/manage/event/entities/event.entity";
import Topic from "src/modules/manage/topic/entities/topic.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Event, Topic])],
  controllers: [EventController],
  providers: [EventService],
})
export class EventModule {}
