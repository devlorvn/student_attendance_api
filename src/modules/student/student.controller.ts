import { Controller, Get } from "@nestjs/common";
import { ExceptionFactory } from "src/common/exceptions/exceptionsFactory";
import { StudentService } from "./student.service";

@Controller("student")
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get("/test")
  async test() {
    throw ExceptionFactory.badRequestException({
      message: "aksksks",
      errorCode: 1,
    });
  }
}
