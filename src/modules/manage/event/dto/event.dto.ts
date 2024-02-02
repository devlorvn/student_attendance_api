import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDate, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MinLength } from "class-validator";

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
    type: Number,
    example: "abc",
  })
  @IsOptional()
  @IsNumber()
  registered: number;

  @ApiProperty({
    type: Object,
    example: {
      type: "abc",
      name: "abc",
    },
  })
  @IsNotEmpty()
  @IsString()
  topics: {
    type: string;
    name: string;
  };

  @ApiProperty({
    type: String,
    example: "abc",
  })
  @IsNotEmpty()
  @IsUUID()
  createdBy: string;
}

export class UpdateEventDto extends PartialType(CreateEventDto) {
  @ApiProperty({
    type: String,
    example: "12345abcd",
  })
  @IsNotEmpty()
  @IsString()
  id: string;
}
