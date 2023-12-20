import { ApiProperty } from "@nestjs/swagger";
import { BaseResponseEntity } from "src/common/entities/BaseResponse.entity";

export class LoginAdminResponse extends BaseResponseEntity {
  @ApiProperty({
    type: Object,
    example: {
      token: "abc",
      refreshToken: "xyz",
    },
  })
  data: {
    token: string;
    refreshToken: string;
  };
}
