import { Controller, Get } from "@nestjs/common";
import { ExceptionFactory } from "src/common/exceptions/exceptionsFactory";
import { StudentService } from "./student.service";
import { FaceDetectionService } from "src/common/providers/face_detection.service";

@Controller("student")
export class StudentController {
  constructor(
    private readonly studentService: StudentService,
    private readonly faceDetectService: FaceDetectionService
  ) {}

  @Get("/test")
  async test() {
    const source = this.faceDetectService.markLabelWithImages([
      {
        mssv: 51900587,
        images: ["51900587.png"],
      },
    ]);
    console.log(source);
    throw ExceptionFactory.badRequestException({
      message: "aksksks",
      errorCode: 1,
    });
  }
}
