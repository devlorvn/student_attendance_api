import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreatePositionAdminDto {
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdatePositionAdminDto extends PartialType(
  CreatePositionAdminDto,
) {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsString()
  @IsOptional()
  name: string;
}
