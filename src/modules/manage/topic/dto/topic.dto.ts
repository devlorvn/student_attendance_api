import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MinLength } from "class-validator";

export class TopicDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}

export class CreateTopicDto extends TopicDto {
  @ApiProperty({
    name: "name",
    type: String,
    example: "abc",
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdateTopicDto extends PartialType(CreateTopicDto) {
  @ApiProperty({
    name: "name",
    type: String,
    example: "abc",
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class QueryTopicDto {
  @ApiProperty({
    name: "id",
    type: String,
    example: "abc",
    required: false,
  })
  @IsUUID()
  id: string;

  @ApiProperty({
    name: "name",
    type: String,
    example: "abc",
    required: false,
  })
  @IsString()
  name: string;

  @ApiProperty({
    name: "createdAt",
    type: Date,
    example: "2023-30-12",
    required: false,
  })
  @IsDate()
  createdAt: Date;

  @ApiProperty({
    name: "updatedAt",
    type: Date,
    example: "2023-30-12",
    required: false,
  })
  @IsDate()
  updatedAt: Date;
}
