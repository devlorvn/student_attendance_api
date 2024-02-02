import { Body, Controller, Get, HttpCode, HttpStatus, Param, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ValidateUser, ValidateUsers } from "./dtos/validate.dto";
import { StudentService } from "src/modules/student/student.service";
import { ExceptionFactory } from "src/common/exceptions/exceptionsFactory";
import { Student } from "src/modules/student/entities/student.entity";
import { RequestWithAdmin } from "../auth/authAdmin.interface";
import { FindStudentsMatch } from "src/modules/student/dtos/student.dto";
import { ApiFilterQuery, ApiFindAll } from "src/common/decorators";
import { JwtAdminAuthGuard } from "src/common/guards";

@Controller("admin/user/manage")
@ApiTags("User Manage API")
// @UseGuards(JwtAdminAuthGuard)
export default class UserController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  @ApiFindAll("sinh viên", Student)
  async getAllUser(@Query() { limit = 10, page = 1 }: { limit?: number; page?: number }) {
    return await this.studentService.findAll({
      limit: limit,
      page: page,
    });
  }

  @Post("/filter")
  @ApiFilterQuery(FindStudentsMatch)
  @HttpCode(HttpStatus.OK)
  async filterUser(@Body() data: FindStudentsMatch) {
    return await this.studentService.findAll({
      where: {
        mssv: data.mssv,
        firstName: data.firstName,
        lastName: data.lastName,
        gender: data.gender,
        major: data.major,
        startYear: data.startYear,
        class: data.class,
      },
      limit: data.limit,
      page: data.page,
    });
  }

  @Put("/validate/:id")
  async validateUser(@Param("id") id: number, @Req() byAdmin: RequestWithAdmin, @Body() data: ValidateUser) {
    const user: Student | null = await this.studentService.findOne({ where: { mssv: id } });
    if (!user) {
      throw ExceptionFactory.notFoundException({
        message: `Người dùng với id=${id} không tồn tại`,
      });
    }

    await this.studentService.updateById(user.mssv, {
      validate: data.validate,
      validateBy: byAdmin.user.id,
      validateAt: new Date(),
    });
  }

  @Put("/enable/:id")
  async changeStatus(@Param("id") id: number) {
    await this.studentService.enable(id);
  }
}
