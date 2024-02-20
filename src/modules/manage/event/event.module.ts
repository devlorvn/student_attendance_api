import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import Admin from "./entities/event.entity";
import Event from "./entities/event.entity";
import EventController from "./event.controller";
import EventService from "./event.service";

@Module({
  imports: [TypeOrmModule.forFeature([Admin, Event])],
  controllers: [EventController],
  providers: [EventService],
  exports: [EventService],
})
export class EventModule {}
