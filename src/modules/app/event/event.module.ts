import { Module } from "@nestjs/common";
import { EventService } from "./event.service";
import { EventController } from "./event.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import Event from "src/modules/manage/event/entities/event.entity";
import Topic from "src/modules/manage/topic/entities/topic.entity";
import { ConfigService } from "@nestjs/config";
import { StorageService } from "src/common/providers/storage.service";
import RegisterEvent from "src/modules/registerEvent/entities/registerEvent.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Event, Topic, RegisterEvent])],
  controllers: [EventController],
  providers: [
    EventService,
    ConfigService,
    {
      provide: StorageService,
      useFactory: () => {
        return new StorageService(process.env.S3_PRIVATE_BUCKET);
      },
    },
  ],
})
export class EventModule {}
