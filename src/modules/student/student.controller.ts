import { Controller, Get } from '@nestjs/common';
import { ExceptionFactory } from 'src/common/exceptions/exceptionsFactory';

@Controller('student')
export class StudentController {
    constructor(
    ) {}

    @Get('/test')
    async test() {
        throw ExceptionFactory.badRequestException({
            message: "aksksks",
            errorCode: 1
        })
    }
}
