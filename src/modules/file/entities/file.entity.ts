import { ApiProperty } from "@nestjs/swagger";

export class File {
  @ApiProperty({
    type: String,
    example: "sample.pdf",
  })
  Key: string;
  @ApiProperty({
    type: Date,
    example: "2023-09-21T08:00:29.000Z",
  })
  LastModified: Date;
  @ApiProperty({
    type: String,
    example: '"2eaa92c4bf7d59c47a6c59f3cb724a2c"',
  })
  ETag: string;
  @ApiProperty({
    type: Number,
    example: 685693,
  })
  Size: number;
  @ApiProperty({
    type: String,
    example: "STANDARD",
  })
  StorageClass: string;
}
