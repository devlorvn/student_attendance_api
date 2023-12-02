import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';

@Injectable()
export class FilePipeValidator implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    
    if (value.size > 1000) {
      throw new BadRequestException(
        'Validation failed (expected size is less than 1000)',
      );
    }
    return true;
  }
}
