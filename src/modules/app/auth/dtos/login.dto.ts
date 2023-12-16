import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, Min } from "class-validator";

export class LoginDto {
  @ApiProperty({
    type: String,
    example: "51900707",
  })
  @IsString({ message: "" })
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    type: String,
    example: "112233",
  })
  @IsNotEmpty()
  @Min(6)
  @IsString()
  password: string;
}
