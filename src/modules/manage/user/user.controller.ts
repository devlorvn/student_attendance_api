import { Body, Controller, Delete, Param, Patch, Post, Put, Query, Req, UseGuards } from "@nestjs/common";
import { ApiQuery, ApiTags } from "@nestjs/swagger";
import { RegisterWithValidateDto, RegistersWithValideDto, ValidateUsersDto } from "./dtos/validate.dto";
import { StudentService } from "src/modules/student/student.service";
import { Student } from "src/modules/student/entities/student.entity";
import { RequestWithAdmin } from "../auth/authAdmin.interface";
import { JwtAdminAuthGuard } from "src/common/guards";
import { PaginationDto } from "src/common/dtos";
import { ApiCreate, ApiFindAll, ApiFindOne } from "src/common/decorators";
import { EnableUsersDto } from "./dtos/enable.dto";
import { QueryUserDto } from "./dtos/query.dto";
import { UpdateStudentDto } from "src/modules/student/dtos/student.dto";

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

  @ApiFindOne("User", Student)
  async getUser(@Param("id") id: number) {
    return await this.studentService.findOne({ where: { mssv: id } });
  }

  @ApiCreate("User", RegisterWithValidateDto)
  async createUser(@Body() user: RegisterWithValidateDto, @Req() byAdmin: RequestWithAdmin) {
    const { autoValidate, ...userData } = user;
    const newUser = await this.studentService.create(userData);
    if (newUser.mssv && autoValidate) {
      await this.studentService.updateByIds([newUser.mssv], {
        validate: true,
        validateBy: byAdmin.user.id,
        validateAt: new Date(),
      });
    }
  }

  @Post("/multiple")
  async createMultiUser(@Body() payload: RegistersWithValideDto, @Req() byAdmin: RequestWithAdmin) {
    // console.log(payload);
    if (payload.autoValidate) {
      const withValidate = payload.users.map((user) => ({
        ...user,
        password: user.password.toString(),
        validate: true,
        validateBy: byAdmin.user.id,
        validateAt: new Date(),
      }));
      return this.studentService.createMultiple(withValidate);
    }
    return this.studentService.createMultiple(payload.users);
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

  @Patch("/:id")
  async updateUser(@Body() payload: UpdateStudentDto, @Param("id") id: number) {
    // delete payload.password;
    // delete payload.mssv;
    await this.studentService.updateById(id, payload);
  }

  @Delete("/:id")
  async deleteUser(@Param("id") mssv: number) {
    return this.studentService.delete(mssv);
  }
}
