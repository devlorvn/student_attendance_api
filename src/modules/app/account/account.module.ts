import { Module } from "@nestjs/common";
import { AccountService } from "./account.service";
import { AccountController } from "./account.controller";
import { ConfigService } from "@nestjs/config";
import { StorageService } from "src/common/providers/storage.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Student } from "src/modules/student/entities/student.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [AccountController],
  providers: [
    AccountService,
    ConfigService,
    {
      provide: StorageService,
      useFactory: () => {
        return new StorageService(process.env.S3_PRIVATE_BUCKET);
      },
    },
  ],
})
export class AccountModule {}
