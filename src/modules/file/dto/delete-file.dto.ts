import { IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class DeleteFileDto {
  @ApiProperty({
    type: String,
    example: 'sample.pdf',
  })
  @IsString()
  @Transform(({ value }) => value.toString())
  key: string;
}