/* eslint-disable @typescript-eslint/naming-convention */
import type { DataSourceOptions } from 'typeorm';

/**
 * Database settings configuration.
 * @param processEnv - The environment variables.
 * @returns The database settings.
 */
export const databaseSetting = (
  processEnv: Record<string, string | undefined>,
): DataSourceOptions => {
  return {
    type: 'postgres',
    host: processEnv.DATABASE_HOST,
    port: parseInt(processEnv.DATABASE_PORT ?? '3306', 10),
    username: processEnv.DATABASE_USER,
    password: processEnv.DATABASE_PASSWORD,
    database: processEnv.DATABASE_NAME,
    migrationsTableName: 'typeorm_migrations',
    entities: ['./dist/out-tsc/libs/core-database/**/*.entity.js'],
    migrations: [
      './dist/out-tsc/libs/core-database/src/typeorm/migrations/*.js',
    ],
    subscribers: [],
    logging: true,
    synchronize: false,
  };
};
