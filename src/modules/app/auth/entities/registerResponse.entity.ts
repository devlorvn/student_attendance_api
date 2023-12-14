import { ApiProperty } from "@nestjs/swagger";
import { BasResponseEntity } from "src/common/entities/BaseResponse.entity";

export class RegisterExample extends BasResponseEntity {
  @ApiProperty({
    type: Object,
    example: {
      id: "abcxyz",
    },
  })
  data: {
    id: string;
  };
}
