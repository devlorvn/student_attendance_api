import { PartialType } from '@nestjs/mapped-types';
import { IsEmail, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @IsNotEmpty()
  @IsString()
  lastName: string;
  @IsEmail()
  @IsNotEmpty()
  email: string;
}

export class UploadedFileDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
export class UpdateUserDto extends PartialType(CreateUserDto) {
  @IsNotEmpty()
  @IsNumber()
  id?: number;
  @IsString()
  firstName?: string;
  @IsString()
  lastName?: string;
  @IsEmail()
  email?: string;
}
