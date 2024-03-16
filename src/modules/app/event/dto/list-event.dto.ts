import { Transform } from "class-transformer";
import { IsNumber, IsOptional, IsString } from "class-validator";

export class ListEventDto {
  @IsOptional()
  @IsString()
  topic?: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  page: number = 1;
}
