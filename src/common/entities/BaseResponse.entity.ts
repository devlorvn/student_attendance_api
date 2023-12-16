import { ApiProperty } from "@nestjs/swagger";

export class BaseResponseEntity {
  @ApiProperty({
    type: String,
    example: "ok",
  })
  status: string;
  @ApiProperty({
    type: String,
    example: "Success",
  })
  message: string;
}
