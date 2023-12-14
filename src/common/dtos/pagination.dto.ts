import { Transform } from "class-transformer";
import { IsInt, IsObject, IsOptional, Max, Min } from "class-validator";

export enum OrderType {
  DESC = "desc",
  ASC = "asc",
}

export class PaginationDto {
  @IsInt()
  @Min(10)
  @Max(1000)
  @Transform(({ value }) => parseInt(value, 10))
  readonly pageSize: number;

  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  readonly page: number;

  @IsObject()
  @IsOptional()
  readonly orderBy?: { [key: string]: OrderType };

  get skip(): number {
    return (this.page - 1) * this.pageSize;
  }
}

export class PaginationOptionalDto {
  @IsInt()
  @Min(10)
  @Max(1000)
  @IsOptional()
  @Transform(({ value }) => parseInt(value, 10))
  readonly pageSize: number;

  @IsInt()
  @Min(1)
  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  readonly page: number;

  @IsObject()
  @IsOptional()
  readonly orderBy?: { [key: string]: OrderType };

  get skip(): number {
    return (this.page - 1) * this.pageSize;
  }
}
