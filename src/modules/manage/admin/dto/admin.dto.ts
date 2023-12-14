import { PartialType } from "@nestjs/mapped-types";
import { IsBoolean, IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, MinLength } from "class-validator";

export class CreateAdminDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @MinLength(6)
  password: string = this.email;

  @IsNotEmpty()
  @IsString()
  positionId: string;

  @IsNotEmpty()
  permission: any;

  @IsBoolean()
  @IsOptional()
  enable: boolean = true;

  @IsOptional()
  moreInfo: any;
}

export class UpdateAdminDto extends PartialType(CreateAdminDto) {
  @IsNotEmpty()
  @IsNumber()
  id: number;

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
