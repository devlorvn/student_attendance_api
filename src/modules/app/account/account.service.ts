import { Injectable } from "@nestjs/common";
import { CreateAccountDto } from "./dto/create-account.dto";
import { UpdateAccountDto } from "./dto/update-account.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Student } from "src/modules/student/entities/student.entity";
import { Repository } from "typeorm";
import { StorageService } from "src/common/providers/storage.service";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Student)
    private registerEventRepository: Repository<Student>,
    private storageService: StorageService,
    private readonly configService: ConfigService
  ) {}

  create(createAccountDto: CreateAccountDto) {
    return "This action adds a new account";
  }

  findAll() {
    return `This action returns all account`;
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  update(id: number, updateAccountDto: UpdateAccountDto) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }

  async uploadAvatarFile(imageBuffer: Buffer, filename: string) {
    filename = `public/avatar/${filename}`;
    await this.storageService.uploadPublicFile(imageBuffer, filename);
    return {
      url: `${this.configService.get("S3_HOST_URL")}/${filename}`,
    };
  }

  async updateStudentAvatar(imageName: string, mssv: Student["mssv"]) {
    const result = await this.registerEventRepository
      .createQueryBuilder()
      .update(Student)
      .set({ avatar: imageName })
      .where("mssv = :mssv", { mssv })
      .execute();
    return result;
  }
}
