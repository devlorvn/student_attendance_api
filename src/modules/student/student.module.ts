import { TypeOrmModule } from "@nestjs/typeorm";
import { Module } from "@nestjs/common";
import { StudentService } from "./student.service";
import { StudentController } from "./student.controller";
import { Student } from "./entities/student.entity";
import { FaceDetectionService } from "src/common/providers/face_detection.service";

@Module({
  imports: [TypeOrmModule.forFeature([Student])],
  controllers: [StudentController],
  providers: [StudentService, FaceDetectionService],
  exports: [StudentService],
})
export class StudentModule {}

// router -> middleware -> controller -> middleware -> return response

// router -> middleware -> pipe -> interceptor -> guard -> controller -> interceptor -> return response
// module (Ioc dependency injection)
