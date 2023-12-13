import { PartialType } from '@nestjs/mapped-types';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  Min,
} from 'class-validator';
import { UserGender } from 'src/common/enums/userType.enum';

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

  @IsNotEmpty()
  @IsString()
  @Min(6)
  password: string;

  @IsNotEmpty()
  @IsDateString()
  dob: string;

  @IsNotEmpty()
  @IsEnum(UserGender)
  gender: UserGender;

  @IsNotEmpty()
  @IsNumberString()
  class: string;

  @IsNotEmpty()
  @IsString()
  major: string;

  @IsNotEmpty()
  @IsNumber()
  startYear: number;
}

export class UploadedFileDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}

export class UpdateUserDto extends PartialType(CreateStudentDto) {}
