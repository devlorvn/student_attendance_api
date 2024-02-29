import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty, ApiQuery } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsArray, IsBoolean, IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MinLength } from "class-validator";
import { PaginationDto } from "src/common/dtos";
import Topic from "../../topic/entities/topic.entity";

export class EventDto {
  @ApiProperty({
    type: String,
    example: "12345abcd",
  })
  id: string;

  @ApiProperty({
    type: String,
    example: "abc",
  })
  title: string;

  @ApiProperty({
    type: String,
    example: "abc",
  })
  subTitle: string;

  @ApiProperty({
    type: String,
    example: "abc",
  })
  content: string;

  @ApiProperty({
    type: String,
    example: "abc",
  })
  banner: string;

  @ApiProperty({
    type: Date,
    example: "2023-12-30",
  })
  startTime: Date;

  @ApiProperty({
    type: Date,
    example: "2023-12-30",
  })
  endTime: Date;

  @ApiProperty({
    type: Date,
    example: "2023-12-30",
  })
  startRegistrationDate: Date;

  @ApiProperty({
    type: Date,
    example: "2023-12-30",
  })
  endRegistrationDate: Date;

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  registration: boolean;

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  enable: boolean;

  @ApiProperty({
    type: Number,
    example: 100,
  })
  amount: number;

  @ApiProperty({
    type: Number,
    example: 0,
  })
  registered: number;
}

export class CreateEventDto {
  @ApiProperty({
    type: String,
    example: "abc",
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    type: String,
    example: "abc",
  })
  @IsNotEmpty()
  @IsString()
  subTitle: string;

  @ApiProperty({
    type: String,
    example: "abc",
  })
  @IsNotEmpty()
  @IsString()
  content: string;

  @ApiProperty({
    type: String,
    example: "abc",
  })
  @IsNotEmpty()
  @IsString()
  banner: string;

  @ApiProperty({
    type: Date,
    example: "2023-12-30",
  })
  @IsNotEmpty()
  @IsDate()
  startTime: Date;

  @ApiProperty({
    type: Date,
    example: "2023-12-30",
  })
  @IsNotEmpty()
  @IsDate()
  endTime: Date;

  @ApiProperty({
    type: Date,
    example: "2023-12-30",
  })
  @IsOptional()
  @IsDate()
  startRegistrationDate: Date;

  @ApiProperty({
    type: Date,
    example: "2023-12-30",
  })
  @IsOptional()
  @IsDate()
  endRegistrationDate: Date;

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  registration: boolean;

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  enable: boolean;

  @ApiProperty({
    type: Number,
    example: 100,
  })
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @ApiProperty({
    type: Object,
    example: ["123", "456"],
  })
  @IsOptional()
  topics?: Topic["id"][];

  @ApiProperty({
    type: String,
  })
  @IsUUID()
  createdBy?: string;
}

export class UpdateEventDto extends PartialType(CreateEventDto) {
  @ApiProperty({
    type: String,
    example: "abc",
  })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({
    type: String,
    example: "abc",
  })
  @IsOptional()
  @IsString()
  subTitle?: string;

  @ApiProperty({
    type: String,
    example: "abc",
  })
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({
    type: String,
    example: "abc",
  })
  @IsOptional()
  @IsString()
  banner?: string;

  @ApiProperty({
    type: Date,
    example: "2023-12-30",
  })
  @IsOptional()
  @IsDate()
  startTime?: Date;

  @ApiProperty({
    type: Date,
    example: "2023-12-30",
  })
  @IsOptional()
  @IsDate()
  endTime?: Date;

  @ApiProperty({
    type: Date,
    example: "2023-12-30",
  })
  @IsOptional()
  @IsDate()
  startRegistrationDate?: Date;

  @ApiProperty({
    type: Date,
    example: "2023-12-30",
  })
  @IsOptional()
  @IsDate()
  endRegistrationDate?: Date;

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  registration?: boolean;

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  enable?: boolean;

  @ApiProperty({
    type: Number,
    example: 100,
  })
  @IsOptional()
  @IsNumber()
  amount?: number;

  @ApiProperty({
    type: Number,
    example: 0,
  })
  @IsOptional()
  @IsNumber()
  registered?: number;

  @ApiProperty({
    type: Object,
    example: ["123", "456"],
  })
  @IsOptional()
  @IsString()
  topics?: Topic["id"][];

  @Exclude()
  createdBy?: string;
}

export class QueryEventDto {
  @ApiProperty({
    example: "abcd1234",
    required: false,
  })
  @IsString()
  id: string;

  @ApiProperty({
    example: "abcd1234",
    required: false,
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: "abcd1234",
    required: false,
  })
  @IsString()
  subTitle: string;

  @ApiProperty({
    example: "abcd1234",
    required: false,
  })
  @IsString()
  content: string;

  @ApiProperty({
    example: "abcd1234",
    required: false,
  })
  @IsString()
  banner: string;

  @ApiProperty({
    example: "2023-12-30",
    required: false,
  })
  @IsDate()
  startTime: Date;

  @ApiProperty({
    example: "2023-12-30",
    required: false,
  })
  @IsDate()
  endTime: Date;

  @ApiProperty({
    example: "2023-12-30",
    required: false,
  })
  @IsDate()
  startRegistrationDate: Date;

  @ApiProperty({
    example: "2023-12-30",
    required: false,
  })
  @IsDate()
  endRegistrationDate: Date;

  @ApiProperty({
    example: false,
    required: false,
  })
  @IsBoolean()
  registration: boolean;

  @ApiProperty({
    example: false,
    required: false,
  })
  @IsBoolean()
  enable: boolean;

  @ApiProperty({
    example: 10,
    required: false,
  })
  @IsNumber()
  amount: number;

  @ApiProperty({
    example: 0,
    required: false,
  })
  @IsNumber()
  registered: number;

  @ApiProperty({
    example: ["11", "22"],
    type: Array,
    required: false,
  })
  @IsArray()
  topics: Topic["id"][];
}
