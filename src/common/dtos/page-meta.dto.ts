import { type PaginationDto } from "src/common/dtos";
import { IsInt } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

interface IPageMetaDtoParameters {
  pageOptionsDto: PaginationDto;
  total: number;
}

export class PageMetaDto {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  @IsInt()
  readonly page: number;

  @ApiProperty({
    type: Number,
    example: 10,
  })
  @IsInt()
  readonly pageSize: number;

  @ApiProperty({
    type: Number,
    example: 100,
  })
  @IsInt()
  readonly total: number;

  constructor({ pageOptionsDto, total }: IPageMetaDtoParameters) {
    this.page = pageOptionsDto.page;
    this.pageSize = pageOptionsDto.pageSize;
    this.total = total;
  }
}
