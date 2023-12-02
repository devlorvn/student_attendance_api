import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { ExceptionsModule } from 'src/common/exceptions/exceptions.module';

@Module({
  imports: [ExceptionsModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
