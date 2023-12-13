import {
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { IFormatExceptionMessage } from 'src/common/exceptions/exception.interface';
export class ExceptionFactory {
  static notFoundException(data?: IFormatExceptionMessage): void {
    throw new NotFoundException(data);
  }
  static badRequestException(data: IFormatExceptionMessage): void {
    throw new BadRequestException(data);
  }
  static forbiddenException(data?: IFormatExceptionMessage): void {
    throw new ForbiddenException(data);
  }
  static unauthorizedException(data?: IFormatExceptionMessage): void {
    throw new UnauthorizedException(data);
  }
}
