import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty, ApiQuery } from "@nestjs/swagger";
import { Exclude } from "class-transformer";
import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MinLength } from "class-validator";
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

  @ApiProperty({
    type: Object,
    example: [
      {
        name: "adasdas",
        id: "asdjkasjd",
      },
    ],
  })
  topics?: Topic[];

  @ApiProperty({
    type: String,
    example: "abc",
  })
  createdBy: string;
}

export class CreateEventDto extends EventDto {
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
  @IsNotEmpty()
  @IsString()
  topics?: Topic[];
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
  topics?: Topic[];

  @Exclude()
  createdBy?: string;
}

export class QueryEventDto {
  @IsString()
  id: string;
  @IsString()
  title: string;
  @IsString()
  subTitle: string;
  @IsString()
  content: string;
  @IsString()
  banner: string;
  @IsDate()
  startTime: Date;
  @IsDate()
  endTime: Date;
  @IsDate()
  startRegistrationDate: Date;
  @IsDate()
  endRegistrationDate: Date;
  @IsBoolean()
  registration: boolean;
  @IsBoolean()
  enable: boolean;
  @IsNumber()
  amount: number;
  @IsNumber()
  registered: number;
  @IsString()
  topics: Topic[];
  @IsUUID()
  createdBy: string;
}
