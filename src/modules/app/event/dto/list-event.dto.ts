import { Transform, Type } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class ListEventDto {
  @IsOptional()
  @IsString()
  topic?: string;

  @IsOptional()
  @IsNumber()
  @Transform(({ value }) => Number(value))
  page: number = 1;

  @IsOptional()
  @IsBoolean()
  @Type(() => Boolean)
  registered: string = "false";
}
