import { ApiProperty } from "@nestjs/swagger";
import { BaseResponseEntity } from "src/common/entities/BaseResponse.entity";

export class RegisterStudent extends BaseResponseEntity {
  @ApiProperty({
    type: Object,
    example: {
      id: "abcxyz",
    },
  })
  data: {
    mssv: string;
  };
}
