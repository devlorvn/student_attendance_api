import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { StudentModule } from "src/modules/student/student.module";
import { PassportModule } from "@nestjs/passport";
import { AppStrategy } from "src/modules/app/auth/strategies/app.strategy";
import { JwtModule } from "@nestjs/jwt";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtRefreshStrategy, JwtStrategy } from "src/modules/app/auth/strategies/jwt.strategy";
import { JwtAdminAuthGuard } from "src/common/guards/jwtAuth.guard";

@Module({
  imports: [
    StudentModule,
    PassportModule,
    ConfigModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get("JWT_SECRET"),
      }),
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get("JWT_REFRESH_SECRET"),
      }),
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, AppStrategy, JwtStrategy, JwtRefreshStrategy, JwtAdminAuthGuard],
})
export class AuthModule {}
