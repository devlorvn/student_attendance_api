import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty } from "class-validator";
import { Student } from "src/modules/student/entities/student.entity";

export class ValidateUser {
  @ApiProperty({
    type: Boolean,
    example: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  validate: boolean;
}

export class ValidateUsers extends PartialType(ValidateUser) {
  @ApiProperty({
    type: Array,
    example: [],
  })
  @IsNotEmpty()
  @IsBoolean()
  ids: Student['mssv'][];
}
