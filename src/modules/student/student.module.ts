import { Module } from '@nestjs/common';
import { ExceptionsModule } from 'src/common/exceptions/exceptions.module';
import { StudentService } from './student.service';

@Module({
  imports: [ExceptionsModule],
  controllers: [],
  providers: [StudentService],
  exports: [StudentService]
})
export class UserModule {}

// router -> middleware -> controller -> middleware -> return response

// router -> middleware -> pipe -> interceptor -> guard -> controller -> interceptor -> return response
// module (Ioc dependency injection)