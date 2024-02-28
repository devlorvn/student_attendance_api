import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import RegisterEvent from "./entities/registerEvent.entity";
import { Student } from "../student/entities/student.entity";
import Event from "../manage/event/entities/event.entity";
import RegisterEventService from "./registerEvent.service";
import RegisterEventController from "./registerEvent.controller";

@Module({
  imports: [TypeOrmModule.forFeature([RegisterEvent, Event, Student])],
  controllers: [RegisterEventController],
  providers: [RegisterEventService],
  exports: [RegisterEventService],
})
export class RegisterEventModule {}
