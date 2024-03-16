import { ApiProperty } from "@nestjs/swagger";
import { BaseResponseEntity } from "src/common/entities/BaseResponse.entity";

export class LoginAdminResponse extends BaseResponseEntity {
  @ApiProperty({
    type: Object,
    example: {
      token: "abc",
      user: {
        id: "123456789",
        name: "abc",
        email: "abc@gmail.com",
      },
    },
  })
  data: {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  };
}
