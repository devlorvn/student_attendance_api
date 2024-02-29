import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty } from "class-validator";
import { Student } from "src/modules/student/entities/student.entity";

export class EnableUsersDto {
  @ApiProperty({
    type: Array,
    example: [],
  })
  @IsNotEmpty()
  @IsBoolean()
  ids: Student["mssv"][];

  @ApiProperty({
    type: Boolean,
    example: true,
  })
  @IsNotEmpty()
  @IsBoolean()
  enable: boolean;
}
