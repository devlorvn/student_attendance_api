import { Module } from "@nestjs/common";
import { AuthController } from "./authAdmin.controller";
import { AuthService } from "./authAdmin.service";
import { PassportModule } from "@nestjs/passport";
import { LocalStrategy } from "src/modules/manage/auth/strategies/local.strategy";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtStrategy } from "src/modules/manage/auth/strategies/jwt.strategy";
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
  providers: [AuthService, LocalStrategy, JwtStrategy],
})
export class AuthAdminModule {}
