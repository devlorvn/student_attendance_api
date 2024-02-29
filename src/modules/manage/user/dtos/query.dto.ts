import { ApiProperty } from "@nestjs/swagger";

export class QueryUserDto {
  @ApiProperty({
    type: String,
    example: "name",
    required: false,
  })
  firstName?: string;

  @ApiProperty({
    type: String,
    example: "name",
    required: false,
  })
  lastName?: string;

  @ApiProperty({
    type: String,
    example: "name",
    required: false,
  })
  class?: string;
}
