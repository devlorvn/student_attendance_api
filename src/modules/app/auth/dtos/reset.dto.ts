import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class ResetStudentPassword {
  @ApiProperty({
    type: String,
    example: "123456",
  })
  @IsNotEmpty()
  @IsString()
  mssv: string;
}
