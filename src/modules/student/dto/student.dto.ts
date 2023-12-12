import { PartialType } from '@nestjs/mapped-types';
import { IsDate, IsDateString, IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsString, Min } from 'class-validator';

export class CreateStudentDto {
  @IsNotEmpty()
  @IsNumberString()
  mssv: number;

  @IsString()
  @IsNotEmpty()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsString()
  @Min(6)
  @IsNotEmpty()
  password: string;


}

export class UploadedFileDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
export class UpdateUserDto extends PartialType(CreateStudentDto) {
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
