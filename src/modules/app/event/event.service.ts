import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Event from "src/modules/manage/event/entities/event.entity";
import Topic from "src/modules/manage/topic/entities/topic.entity";
import { Student } from "src/modules/student/entities/student.entity";
import { ListEventDto } from "./dto/list-event.dto";
import { StorageService } from "src/common/providers/storage.service";
import { ConfigService } from "@nestjs/config";
import RegisterEvent from "src/modules/registerEvent/entities/registerEvent.entity";

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
    @InjectRepository(Topic)
    private topicRepository: Repository<Topic>,
    @InjectRepository(RegisterEvent)
    private registerEventRepository: Repository<RegisterEvent>,
    private storageService: StorageService,
    private readonly configService: ConfigService
  ) {}

  async findAll(mssv: Student["mssv"], { page, topic, registered }: ListEventDto) {
    let [events, count] = await this.eventRepository.findAndCount({
      where: {
        topics: {
          id: topic,
        },
        registers: {
          mssv: registered === "true" ? mssv : undefined,
        },
        enable: true,
      },
      take: 10,
      skip: (page - 1) * 10,
      order: {
        createdAt: "DESC",
      },
      relations: ["topics", "registers", "registers.mssv"],
    });

    return {
      events: events.map((event) => ({
        ...event,
        registred: event.registers.some((item: any) => item.mssv.mssv === mssv),
        attendance: event.registers.some((item: any) => item.mssv.mssv === mssv && item.attendance),
      })),
      count,
    };
  }

  async findOne(mssv: Student["mssv"], id: string) {
    let event = await this.eventRepository.findOne({
      where: {
        id,
      },
      relations: ["topics", "registers", "registers.mssv"],
    });

    return { ...event, attendance: event.registers.some((item: any) => item.mssv.mssv === mssv && item.attendance) };
  }

  async topics() {
    return this.topicRepository.find({
      select: {
        id: true,
        name: true,
      },
    });
  }

  async registered(mssv: Student["mssv"]) {
    const [events, count] = await this.eventRepository.findAndCount({
      where: {
        registers: {
          mssv,
        },
      },
      relations: ["topics", "registers", "registers.mssv"],
    });
    return {
      events: events.map((event) => ({
        ...event,
        attendance: event.registers.some((item: any) => item.mssv.mssv === mssv && item.attendance),
      })),
      count,
    };
  }

  async uploadFilePrivate(imageBuffer: Buffer, filename: string) {
    filename = `private/${filename}`;
    await this.storageService.uploadPublicFile(imageBuffer, filename);
    return {
      url: `${this.configService.get("S3_HOST_URL")}/${filename}`,
    };
  }

  async updateAttendance(mssv: Student["mssv"], eventId: Event["id"], imageURL: RegisterEvent["attendanceImage"]) {
    const foundRegister = await this.registerEventRepository.findOne({
      where: {
        eventId: eventId,
        mssv,
      },
    });
    let updateResult: RegisterEvent;
    if (foundRegister) updateResult = await this.registerEventRepository.save({ ...foundRegister, attendanceImage: imageURL });
    return updateResult;
  }
}
