import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExceptionsModule } from 'src/common/exceptions/exceptions.module';
import Admin from './entities/admin.entity';
import AdminController from './admin.controller';
import AdminService from './admin.service';
import { PositionAdminModule } from '../positionAdmin/positionAdmin.module';
import PositionAdminService from '../positionAdmin/positionAdmin.service';

@Module({
  imports: [ExceptionsModule, PositionAdminModule],
  controllers: [AdminController],
  providers: [AdminService, PositionAdminService],
  exports: [AdminService],
})
export class AdminModule {}
