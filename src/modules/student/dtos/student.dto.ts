import { PartialType } from "@nestjs/mapped-types";
import { ApiParam, ApiProperty } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsDateString, IsEnum, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Min, MinLength } from "class-validator";
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
  @MinLength(6)
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
  @ApiProperty({
    type: Number,
    example: 123,
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class UpdatePasswordStudentDto {
  @ApiProperty({
    type: String,
    example: "112233",
  })
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @ApiProperty({
    type: String,
    example: "112233",
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  newPassord: string;
}

export class UpdateStudentDto extends PartialType(CreateStudentDto) {
  @Exclude()
  password?: string;

  images?: string[];
}

export class FindStudentsMatch extends PartialType(CreateStudentDto) {
  @Exclude()
  password?: string;

  @Exclude()
  dob?: string;

  class?: string;
  firstName?: string;
  lastName?: string;
  gender?: UserGender;
  major?: string;
  @ApiProperty({
    type: Number,
    example: 51900707,
  })
  @IsOptional()
  @IsNumberString()
  mssv?: number;
  startYear?: number;
}

export class PaginateDto {
  limit: number = 10;

  page?: number = 1;
}
