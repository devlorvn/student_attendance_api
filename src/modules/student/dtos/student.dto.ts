import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsNumberString, IsString, Min } from "class-validator";
import { UserGender } from "src/common/enums/userType.enum";

export class CreateStudentDto {
  @ApiProperty({
    type: Number,
    example: 51900707,
  })
  @IsNotEmpty()
  @IsNumberString()
  mssv: number;

  @ApiProperty({
    type: String,
    example: "Luân",
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    type: String,
    example: "Nguyễn Thành",
  })
  @IsNotEmpty()
  @IsString()
  lastName: string;

  @ApiProperty({
    type: String,
    example: "112233",
  })
  @IsNotEmpty()
  @IsString()
  @Min(6)
  password: string;

  @ApiProperty({
    type: String,
    example: "2001-01-06",
  })
  @IsNotEmpty()
  @IsDateString()
  dob: string;

  @ApiProperty({
    type: String,
    example: "MALE",
  })
  @IsNotEmpty()
  @IsEnum(UserGender)
  gender: UserGender;

  @ApiProperty({
    type: String,
    example: "19050201",
  })
  @IsNotEmpty()
  @IsNumberString()
  class: string;

  @ApiProperty({
    type: String,
    example: "Kĩ thuật phần mềm",
  })
  @IsNotEmpty()
  @IsString()
  major: string;

  @ApiProperty({
    type: String,
    example: "2019",
  })
  @IsNotEmpty()
  @IsNumber()
  startYear: number;
}

export class UploadedFileDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class UpdateUserDto extends PartialType(CreateStudentDto) {}
