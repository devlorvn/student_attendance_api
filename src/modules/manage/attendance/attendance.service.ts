import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import Event from "src/modules/manage/event/entities/event.entity";
import { Student } from "src/modules/student/entities/student.entity";
import { StorageService } from "src/common/providers/storage.service";
import { ConfigService } from "@nestjs/config";
import RegisterEvent from "src/modules/registerEvent/entities/registerEvent.entity";

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(RegisterEvent)
    private registerEventRepository: Repository<RegisterEvent>,
    private storageService: StorageService,
    private readonly configService: ConfigService
  ) {}

  async uploadFilePrivate(imageBuffer: Buffer, filename: string) {
    filename = `public/${filename}`;
    await this.storageService.uploadPublicFile(imageBuffer, filename);
    return {
      url: `${this.configService.get("S3_HOST_URL")}/${filename}`,
    };
  }

  async updateAttendance(mssv: Student["mssv"], eventId: Event["id"], imageURL: RegisterEvent["attendanceImage"]) {
    const result = await this.registerEventRepository
      .createQueryBuilder()
      .update(RegisterEvent)
      .set({ attendanceImage: imageURL, attendance: true })
      .where("eventId = :eventId", { eventId })
      .andWhere("mssv = :mssv", { mssv: mssv })
      .execute();
    return result;
  }
}
