import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExceptionsModule } from 'src/common/exceptions/exceptions.module';
import PositionAdmin from './entities/positionAdmin.entity';
import PositionAdminController from './positionAdmin.controller';
import PositionAdminService from './positionAdmin.service';

@Module({
  imports: [TypeOrmModule.forFeature([PositionAdmin]), ExceptionsModule],
  controllers: [PositionAdminController],
  providers: [PositionAdminService],
  exports: [PositionAdminService],
})
export class PositionAdminModule {}
