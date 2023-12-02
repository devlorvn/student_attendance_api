import { plainToClass } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString, validateSync } from 'class-validator';

enum Environment {
  development = 'dev',
  production = 'production',
  local = 'local',
  test = 'test',
}

class EnvironmentVariables {
  @IsOptional()
  NODE_ENV: Environment = Environment.development;

  PORT: number;
  DATABASE_SYSTEM_IDS: string;
  DB_POSTGRES_TYPE: string;
  DB_POSTGRES_HOST: string;
  DB_POSTGRES_PORT: number;
  DB_POSTGRES_USERNAME: string;
  DB_POSTGRES_PASSWORD: string;
  DB_POSTGRES_DATABASE: string;
  DB_POSTGRES_SYNCHRONIZE: string;

  BCRYPT_SALT: number;
  API_PREFIX: string;
  TOKEN: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
