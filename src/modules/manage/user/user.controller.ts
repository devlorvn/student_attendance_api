import { Body, Controller, Param, Patch, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { ValidateUsersDto } from "./dtos/validate.dto";
import { StudentService } from "src/modules/student/student.service";
import { Student } from "src/modules/student/entities/student.entity";
import { RequestWithAdmin } from "../auth/authAdmin.interface";
import { JwtAdminAuthGuard } from "src/common/guards";
import { PaginationDto } from "src/common/dtos";
import { ApiFindAll } from "src/common/decorators";
import { EnableUsersDto } from "./dtos/enable.dto";
import { QueryUserDto } from "./dtos/query.dto";

@Controller("admin/user")
@ApiTags("User Manage API")
@UseGuards(JwtAdminAuthGuard)
export default class UserController {
  constructor(private readonly studentService: StudentService) {}

  @ApiQuery({
    name: "pageSize",
    type: Number,
    required: false,
    example: 10,
  })
  @ApiQuery({
    name: "page",
    type: Number,
    required: false,
    example: 1,
  })
  @ApiQuery({
    name: "orderBy",
    required: false,
    example: {
      createdAt: "asc",
    },
  })
  @ApiQuery({
    type: QueryUserDto,
  })
  @ApiFindAll("User", Student)
  async getAllUser(@Query() { pageSize = 10, page = 1, orderBy, ...filters }: PaginationDto & QueryUserDto) {
    return await this.studentService.findAll({
      pagination: {
        page: page,
        pageSize: pageSize,
        orderBy: orderBy,
        skip: (page - 1) * pageSize,
      },
      where: filters,
    });
  }

  @Patch("/validate")
  async validateUser(@Req() byAdmin: RequestWithAdmin, @Body() payload: ValidateUsersDto) {
    return await this.studentService.updateByIds(payload.ids, {
      validate: payload.validate,
      validateBy: byAdmin.user.id,
      validateAt: new Date(),
    });
  }

  @Patch("/enable")
  async changeStatus(@Body() payload: EnableUsersDto) {
    await this.studentService.updateByIds(payload.ids, { enable: payload.enable });
  }
}
