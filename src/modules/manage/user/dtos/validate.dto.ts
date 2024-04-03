import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsDateString, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { UserGender } from "src/common/enums";
import { Student } from "src/modules/student/entities/student.entity";

export class ValidateUsersDto {
  @ApiProperty({
    type: Array,
    example: [],
  })
  @IsNotEmpty()
  @IsArray()
  ids: Student["mssv"][];

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  validate: boolean;
}

export class RegisterWithValidateDto {
  @ApiProperty({
    type: Number,
    example: 123456,
  })
  @IsNumber()
  @IsNotEmpty()
  mssv: number;

  @ApiProperty({
    type: String,
    example: "aaaa",
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    type: String,
    example: "aaaa",
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    type: String,
    example: "2023-30-12",
  })
  @IsDateString()
  @IsNotEmpty()
  dob: string;

  @ApiProperty({
    type: String,
    example: "aaaa",
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: String,
    example: "MALE",
  })
  @IsNotEmpty()
  @IsEnum(UserGender)
  gender: UserGender;

  @ApiProperty({
    type: String,
    example: "aaaa",
  })
  @IsString()
  @IsNotEmpty()
  class: string;

  @ApiProperty({
    type: String,
    example: "aaaa",
  })
  @IsString()
  @IsNotEmpty()
  major: string;

  @ApiProperty({
    type: Number,
    example: 2022,
  })
  @IsNumber()
  @IsNotEmpty()
  startYear: number;

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  autoValidate: boolean;
}

class RegisterDto {
  @ApiProperty({
    type: Number,
    example: 123456,
  })
  @IsNumber()
  @IsNotEmpty()
  mssv: number;

  @ApiProperty({
    type: String,
    example: "aaaa",
  })
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({
    type: String,
    example: "aaaa",
  })
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({
    type: String,
    example: "2023-30-12",
  })
  @IsDateString()
  @IsNotEmpty()
  dob: string;

  @ApiProperty({
    type: String,
    example: "aaaa",
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    type: String,
    example: "MALE",
  })
  @IsNotEmpty()
  @IsEnum(UserGender)
  gender: UserGender;

  @ApiProperty({
    type: String,
    example: "aaaa",
  })
  @IsString()
  @IsNotEmpty()
  class: string;

  @ApiProperty({
    type: String,
    example: "aaaa",
  })
  @IsString()
  @IsNotEmpty()
  major: string;

  @ApiProperty({
    type: [String],
    example: ["aaaa", "bbbb"],
  })
  @IsString()
  @IsOptional()
  images: string[];

  @ApiProperty({
    type: Number,
    example: 2022,
  })
  @IsNumber()
  @IsNotEmpty()
  startYear: number;
}

export class RegistersWithValideDto {
  @ApiProperty({
    type: [RegisterDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => RegisterDto)
  users: RegisterDto[];

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  @IsBoolean()
  @IsNotEmpty()
  autoValidate: boolean;
}
