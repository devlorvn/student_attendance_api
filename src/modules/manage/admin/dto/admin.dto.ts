import { PartialType } from "@nestjs/mapped-types";
import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MinLength } from "class-validator";
import PositionAdmin from "../../positionAdmin/entities/positionAdmin.entity";

export class CreateAdminDto {
  @ApiProperty({
    type: String,
    example: "Nguyen Van A",
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    type: String,
    example: "abc@gmail.com",
  })
  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @ApiProperty({
    type: String,
    example: "123456",
    minLength: 6,
  })
  @MinLength(6)
  password: string = this.email;

  @ApiProperty({
    type: String,
    example: "abcxyz",
  })
  @IsUUID()
  @IsNotEmpty()
  @IsString()
  positionId: string;

  @ApiProperty({
    type: String,
    example: "manage, admin",
    nullable: true,
  })
  @IsOptional()
  permission: any;

  @ApiProperty({
    type: Boolean,
    example: "true",
    default: "true",
  })
  @IsBoolean()
  @IsOptional()
  enable: boolean = true;

  @ApiProperty({
    type: Object,
    example: {},
    default: {},
    nullable: true,
  })
  @IsOptional()
  moreInfo: any;
}

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
  @IsNotEmpty()
  @IsNumber()
  id: string;

  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  password: string;

  @IsString()
  @IsOptional()
  positionId: string;

  @IsOptional()
  permission: any;

  @IsBoolean()
  @IsOptional()
  enable: boolean;

  @IsOptional()
  moreInfo: any;
}

export class UpdatePasswordAdminDto {
  @ApiProperty({
    type: String,
    example: "112233",
  })
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @ApiProperty({
    type: String,
    example: "112233",
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  newPassord: string;
}
