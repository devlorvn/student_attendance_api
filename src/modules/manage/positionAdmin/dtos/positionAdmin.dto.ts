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
    example: "123456",
  })
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @ApiProperty({
    type: String,
    example: "manage student",
  })
  @IsString()
  @IsOptional()
  name: string;
}
