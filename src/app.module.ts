import { ClassSerializerInterceptor, Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AppService } from './app.service';
import { EnvironmentConfigModule } from './common/config/env/env.config.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { AuthModule } from './modules/app/auth/auth.module';
import { AdminModule } from './modules/manage/admin/admin.module';
import { PositionAdminModule } from './modules/manage/positionAdmin/positionAdmin.module';

@Module({
  imports: [
    EnvironmentConfigModule,
    DatabaseModule,
    AuthModule,
    AdminModule,
    PositionAdminModule,
  ],
  controllers: [],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
  ],
})
export class AppModule {}
