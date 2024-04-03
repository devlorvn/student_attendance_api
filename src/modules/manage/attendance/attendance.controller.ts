import { Controller, Get, Param, UseGuards, Query, Req, Patch, UseInterceptors, UploadedFile, Body } from "@nestjs/common";
import { ApiBody, ApiConsumes, ApiTags } from "@nestjs/swagger";
import { JwtAdminAuthGuard } from "src/common/guards";
import { FileInterceptor } from "@nestjs/platform-express";
import { ExceptionFactory } from "src/common/exceptions/exceptionsFactory";
import { AttendanceService } from "./attendance.service";
import { RequestWithUser } from "src/modules/app/auth/auth.interface";

@Controller("admin/event")
@ApiTags("Attendance")
@UseGuards(JwtAdminAuthGuard)
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Patch("/attendance/user")
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    schema: {
      required: ["eventId", "file", "mssv"],
      type: "object",
      properties: {
        eventId: {
          type: "string",
        },
        mssv: {
          type: "array",
          items: {
            type: "string",
            format: "number",
            example: 0,
          },
        },
        file: {
          type: "string",
          format: "binary",
        },
      },
    },
  })
  @UseInterceptors(FileInterceptor("file"))
  async attendanceEvent(@UploadedFile() file: Express.Multer.File, @Body("eventId") eventId: string, @Body("mssv") mssv: string[]) {
    // const timestamp = Date.now();
    // const newFileName = `${file.originalname}_${timestamp}`;
    const result = await this.attendanceService.uploadFilePrivate(file.buffer, file.originalname);
    if (result) {
      return this.attendanceService.updateAttendance(
        mssv.map((m) => parseInt(m)),
        eventId,
        result.url.split("public/")[1]
      );
    }
    return ExceptionFactory.badRequestException({
      message: "Lỗi",
      errorCode: -1,
    });
  }
}
