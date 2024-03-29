import { Module } from "@nestjs/common";
import { AuthController } from "./authAdmin.controller";
import { AuthService } from "./authAdmin.service";
import { PassportModule } from "@nestjs/passport";
import { AdminStrategy } from "src/modules/manage/auth/strategies/admin.strategy";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtAdminStrategy } from "src/modules/manage/auth/strategies/jwt.strategy";
import { AdminModule } from "../admin/admin.module";

@Module({
  imports: [
    AdminModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get("JWT_SECRET"),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AdminStrategy, JwtAdminStrategy],
})
export class AuthAdminModule {}
