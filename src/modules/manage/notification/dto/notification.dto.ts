import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsBoolean, IsDate, IsEmail, IsNotEmpty, IsNumber, IsObject, IsOptional, IsString, IsUUID, MinLength } from "class-validator";

export class NotificationDto {
  @IsUUID()
  id?: string;

  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsUUID()
  eventId: string;

  @IsDate()
  createdAt?: Date;
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
    name: "eventId",
    type: String,
    example: "abc",
  })
  @IsUUID()
  eventId: string;
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
    name: "eventId",
    type: String,
    example: "abc",
  })
  @IsUUID()
  eventId: string;
}

export class QueryNotificationDto {
  @ApiProperty({
    name: "id",
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
    name: "eventId",
    type: String,
    example: "abc",
    required: false,
  })
  @IsUUID()
  eventId: string;
}
