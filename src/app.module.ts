import { ClassSerializerInterceptor, Module } from "@nestjs/common";
import { APP_FILTER, APP_INTERCEPTOR } from "@nestjs/core";
import { AppService } from "./app.service";
import { DatabaseModule } from "./infrastructure/database/database.module";
import { AuthModule } from "./modules/app/auth/auth.module";
import { AuthAdminModule } from "./modules/manage/auth/authAdmin.module";
import { AdminModule } from "./modules/manage/admin/admin.module";
import { PositionAdminModule } from "./modules/manage/positionAdmin/positionAdmin.module";
import { StudentModule } from "./modules/student/student.module";
import { ConfigModule } from "@nestjs/config";
import * as Joi from "joi";
import { AllExceptionFilter } from "./common/exceptions/filter/exception.filter";
import { AppController } from "./app.controller";
import { UserModule } from "./modules/manage/user/user.module";
import { EventModule } from "./modules/manage/event/event.module";
import { TopicModule } from "./modules/manage/topic/topic.module";
import { RegisterEventModule } from "./modules/registerEvent/registerEvent.module";
import { NotificationModule } from "./modules/manage/notification/notification.module";
import { NotificationUserModule } from "./modules/manage/notificationUser/notificationUser.module";
import { FileModule } from "./modules/file/file.module";
import { AccountModule } from "./modules/app/account/account.module";
import { EventModule as AppEventModule } from "./modules/app/event/event.module";
import { AttendanceModule } from "./modules/manage/attendance/attendance.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        NODE_ENV: Joi.string().valid("development", "test", "production").required(),
        PORT: Joi.number().required(),
        DB_POSTGRES_HOST: Joi.string().required(),
        DB_POSTGRES_PORT: Joi.string().required(),
        DB_POSTGRES_USERNAME: Joi.string().required(),
        DB_POSTGRES_PASSWORD: Joi.string().required(),
        DB_POSTGRES_DATABASE: Joi.string().required(),
        DB_POSTGRES_SYNCHRONIZE: Joi.string().required(),
        BCRYPT_SALT: Joi.string().required(),
        API_PREFIX: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        JWT_REFRESH_SECRET: Joi.string().required(),
        JWT_TOKEN_EXPIRE_TIME: Joi.string().required(),
        JWT_REFRESH_TOKEN_EXPIRE_TIME: Joi.string().required(),
      }),
    }),
    DatabaseModule,
    AuthModule,
    AuthAdminModule,
    AdminModule,
    PositionAdminModule,
    StudentModule,
    UserModule,
    EventModule,
    TopicModule,
    RegisterEventModule,
    NotificationModule,
    NotificationUserModule,
    FileModule,
    AccountModule,
    AppEventModule,
    AttendanceModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionFilter,
    },
  ],
})
export class AppModule {}
