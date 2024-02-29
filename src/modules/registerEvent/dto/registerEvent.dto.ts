import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import Event from "src/modules/manage/event/entities/event.entity";
import { Student } from "src/modules/student/entities/student.entity";

export class CreateRegisterEventDto {
  @ApiProperty({
    type: String,
    example: "adksjasdjlkas",
  })
  eventId: Event["id"];

  @ApiProperty({
    type: Number,
    example: 123456,
  })
  mssv: Student["mssv"];
}

export class CreateMultiRegisterEventDto {
  @ApiProperty({
    type: String,
    example: "adksjasdjlkas",
  })
  eventId: Event["id"];

  @ApiProperty({
    type: Array,
    example: [123456, 78910],
  })
  mssv: Student["mssv"][];
}

export class UpdateRegisterEventDto extends PartialType(CreateRegisterEventDto) {
  @ApiProperty({
    type: String,
    example: "ksjdaksjdla",
  })
  @IsString()
  @IsOptional()
  eventId: Event["id"];

  @ApiProperty({
    type: Number,
    example: 123456,
  })
  @IsNumber()
  @IsOptional()
  mssv: Student["mssv"];
}

export class RegisterEventDto {
  @ApiProperty({
    type: String,
    example: "adksjasdjlkas",
  })
  id: string;

  @ApiProperty({
    type: String,
    example: "adksjasdjlkas",
  })
  eventId: Event["id"];

  @ApiProperty({
    type: Number,
    example: 123456,
  })
  mssv: Student["mssv"];

  @ApiProperty({
    type: Boolean,
    example: false,
  })
  attendance: boolean;

  @ApiProperty({
    type: String,
    example: "url link",
  })
  attendanceImage: string;

  @ApiProperty({
    type: Date,
    example: "2023-12-30",
  })
  createdAt: Date;

  @ApiProperty({
    type: Date,
    example: "2023-12-30",
  })
  updatedAt: Date;
}

export class QueryRegisterEventDto {
  @ApiProperty({
    example: "aabbcc",
    required: false,
  })
  id: string;

  @ApiProperty({
    type: String,
    example: "adksjasdjlkas",
    required: false,
  })
  eventId: Event["id"];

  @ApiProperty({
    type: Number,
    example: 123456,
    required: false,
  })
  mssv: Student["mssv"];
}
