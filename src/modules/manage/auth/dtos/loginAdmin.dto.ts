import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Min } from "class-validator";

export class LoginAdminDto {
  @ApiProperty({
    type: String,
    example: "admin@example.com",
  })
  @IsString({ message: "" })
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: String,
    example: "123456789",
  })
  @IsNotEmpty()
  @Min(6)
  @IsString()
  password: string;
}
