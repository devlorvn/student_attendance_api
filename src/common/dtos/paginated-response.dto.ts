import { ApiProperty } from "@nestjs/swagger";
import { PageMetaDto } from "src/common/dtos";
import { Type } from "class-transformer";
import { ValidateNested } from "class-validator";

export class PaginatedResponseDto<T> {
  @ApiProperty({ isArray: true })
  readonly data: T[];

  @ApiProperty({ type: PageMetaDto })
  @Type(() => PageMetaDto)
  @ValidateNested()
  readonly meta: PageMetaDto;

  constructor(data: T[], meta: PageMetaDto) {
    this.data = data;
    this.meta = meta;
  }
}
