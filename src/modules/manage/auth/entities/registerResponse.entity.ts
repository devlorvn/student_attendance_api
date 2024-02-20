import { ApiProperty } from "@nestjs/swagger";
import { BaseResponseEntity } from "src/common/entities/BaseResponse.entity";

export class RegisterAdminResponse extends BaseResponseEntity {
  @ApiProperty({
    type: Object,
    example: {
      email: "abc@gmail.com",
    },
  })
  data: {
    email: string;
  };
}
