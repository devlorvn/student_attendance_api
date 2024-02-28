import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreatePositionAdminDto {
  @ApiProperty({
    type: String,
    example: "manage student",
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdatePositionAdminDto extends PartialType(CreatePositionAdminDto) {
  @ApiProperty({
    type: String,
    example: "manage student",
  })
  @IsString()
  @IsOptional()
  name: string;
}

export class PositionAdminDto {
  @ApiProperty({
    example: "aabbcc",
  })
  id?: string;

  @ApiProperty({
    example: "aabbcc",
  })
  name: string;

  @ApiProperty({
    example: "2023-12-30",
  })
  createdAt: Date;

  @ApiProperty({
    example: "2023-12-30",
  })
  updatedAt: Date;
}

export class QueryPositionAdminDto {
  @ApiProperty({
    example: "aabbcc",
    required: false,
  })
  id: string;

  @ApiProperty({
    example: "aabbcc",
    required: false,
  })
  name: string;

  @ApiProperty({
    example: "2023-12-30",
    required: false,
  })
  createdAt: Date;

  @ApiProperty({
    example: "2023-12-30",
    required: false,
  })
  updatedAt: Date;
}
