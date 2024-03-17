import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsDate, IsEmail, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, IsUUID, MinLength } from "class-validator";
import Notification from "../../notification/entities/notification.entity";
import { Student } from "src/modules/student/entities/student.entity";

export class NotificationUserDto {
  @IsUUID()
  id?: string;

  @IsString()
  notificationId: Notification["id"];

  @IsNumber()
  mssv: Student["mssv"];

  @IsBoolean()
  seen: boolean;

  @IsDate()
  createdAt: Date;
}

export class CreateNotificationUserDto extends NotificationUserDto {
  @ApiProperty({
    name: "notificationId",
    type: String,
    example: "abc",
  })
  @IsNotEmpty()
  @IsString()
  notificationId: Notification["id"];

  @ApiProperty({
    name: "mssv",
    type: Number,
    example: 1234,
  })
  @IsString()
  mssv: Student["mssv"];

  @ApiProperty({
    name: "seen",
    type: Boolean,
    example: "abc",
  })
  @IsBoolean()
  seen: boolean;
}

export class CreateMultiNotificationUserDto {
  @ApiProperty({
    name: "notificationId",
    type: String,
    example: "abc",
  })
  @IsNotEmpty()
  @IsString()
  notificationId: Notification["id"];

  @ApiProperty({
    name: "mssv",
    type: Array,
    example: [1231, 1212],
  })
  @IsArray()
  mssv: Student["mssv"][];
}

export class UpdateNotificationUserDto extends PartialType(CreateNotificationUserDto) {
  @ApiProperty({
    name: "notificationId",
    type: String,
    example: "abc",
  })
  @IsNotEmpty()
  @IsString()
  notificationId: Notification["id"];

  @ApiProperty({
    name: "mssv",
    type: Number,
    example: 1234,
  })
  @IsString()
  mssv: Student["mssv"];

  @ApiProperty({
    name: "seen",
    type: Boolean,
    example: "abc",
  })
  @IsBoolean()
  seen: boolean;
}

export class QueryNotificationUserDto {
  @ApiProperty({
    name: "id",
    type: String,
    example: "abc",
    required: false,
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    name: "mssv",
    type: Number,
    example: 1234,
    required: false,
  })
  @IsString()
  mssv: Student["mssv"];

  @ApiProperty({
    name: "seen",
    type: Boolean,
    example: "abc",
    required: false,
  })
  @IsBoolean()
  seen: boolean;
}

export class MarkAsReadDto {
  @ApiProperty({
    name: "id",
    type: String,
    example: "abc",
    required: false,
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    name: "seen",
    type: Boolean,
    example: "abc",
    required: false,
  })
  @IsBoolean()
  seen: boolean;
}
