import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: "postgres",
        host: config.get(`DB_POSTGRES_HOST`),
        port: parseInt(config.get(`DB_POSTGRES_PORT`)),
        username: config.get(`DB_POSTGRES_USERNAME`),
        password: config.get(`DB_POSTGRES_PASSWORD`),
        database: config.get(`DB_POSTGRES_DATABASE`),
        // synchronize: config.get(`DB_POSTGRES_SYNCHRONIZE`) === "true",
        entities: [`${__dirname}/../../**/*.entity.{ts,js}`],
        extra: {
          ssl: {
            rejectUnauthorized: false,
          },
        },
      }),
    }),
  ],
})
export class DatabaseModule {}
