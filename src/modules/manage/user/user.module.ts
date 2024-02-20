import { Module } from "@nestjs/common";
import UserController from "./user.controller";
import UserService from "./user.service";
import { StudentService } from "src/modules/student/student.service";
import { StudentModule } from "src/modules/student/student.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Student } from "src/modules/student/entities/student.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Student]), StudentModule],
  controllers: [UserController],
  providers: [UserService, StudentService],
  exports: [UserService],
})
export class UserModule {}
