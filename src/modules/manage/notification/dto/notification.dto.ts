import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, IsUUID, MinLength } from "class-validator";

export class NotificationDto {
  @IsUUID()
  id: string;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsBoolean()
  status: boolean;

  @IsObject()
  data: {};

  @IsObject()
  to: {};

  @IsObject()
  schedule: {};

  @IsDate()
  createdAt: Date;
}

export class CreateNotificationDto extends NotificationDto {
  @ApiProperty({
    name: "title",
    type: String,
    example: "abc",
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    name: "content",
    type: String,
    example: "abc",
  })
  @IsString()
  content: string;

  @ApiProperty({
    name: "status",
    type: Boolean,
    example: "abc",
  })
  @IsBoolean()
  status: boolean;

  @ApiProperty({
    name: "data",
    type: Object,
    example: {},
  })
  @IsObject()
  data: {};

  @ApiProperty({
    name: "to",
    type: Object,
    example: {},
  })
  @IsObject()
  to: {};

  @ApiProperty({
    name: "schedule",
    type: Object,
    example: {},
  })
  @IsObject()
  schedule: {};
}

export class UpdateNotificationDto extends PartialType(CreateNotificationDto) {
  @ApiProperty({
    name: "title",
    type: String,
    example: "abc",
  })
  @IsString()
  title: string;

  @ApiProperty({
    name: "content",
    type: String,
    example: "abc",
  })
  @IsString()
  content: string;

  @ApiProperty({
    name: "status",
    type: Boolean,
    example: "abc",
  })
  @IsBoolean()
  status: boolean;

  @ApiProperty({
    name: "data",
    type: Object,
    example: {},
  })
  @IsObject()
  data: {};

  @ApiProperty({
    name: "to",
    type: Object,
    example: {},
  })
  @IsObject()
  to: {};

  @ApiProperty({
    name: "schedule",
    type: Object,
    example: {},
  })
  @IsObject()
  schedule: {};
}

export class QueryNotificationDto {
  @ApiProperty({
    name: "title",
    type: String,
    example: "abc",
    required: false,
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    name: "title",
    type: String,
    example: "abc",
    required: false,
  })
  @IsString()
  title: string;

  @ApiProperty({
    name: "content",
    type: String,
    example: "abc",
    required: false,
  })
  @IsString()
  content: string;

  @ApiProperty({
    name: "status",
    type: Boolean,
    example: "abc",
    required: false,
  })
  @IsBoolean()
  status: boolean;

  @ApiProperty({
    name: "data",
    type: Object,
    example: {},
    required: false,
  })
  @IsObject()
  data: {};

  @ApiProperty({
    name: "to",
    type: Object,
    example: {},
    required: false,
  })
  @IsObject()
  to: {};

  @ApiProperty({
    name: "schedule",
    type: Object,
    example: {},
    required: false,
  })
  @IsObject()
  schedule: {};
}
