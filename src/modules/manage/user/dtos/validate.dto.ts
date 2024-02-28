import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Student } from "src/modules/student/entities/student.entity";

export class ValidateUsersDto {
  @ApiProperty({
    type: Array,
    example: [],
  })
  @IsNotEmpty()
  @IsBoolean()
  ids: Student["mssv"][];

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  validate: boolean;
}
