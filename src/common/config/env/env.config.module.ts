import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './env.config.validation';
import ormConfig from 'src/infrastructure/config/orm.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `${process.cwd()}/.env.${process.env.NODE_ENV}`,
      ignoreEnvFile: process.env.NODE_ENV !== 'production' ? false : true,
      isGlobal: true,
      validate,
      load: [ormConfig],
    }),
  ],
  providers: [],
  exports: [],
})
export class EnvironmentConfigModule {}
