import { entities } from '../database/entities';
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
    entities: entities,
    migrations: ['./dist/libs/src/database/migrations/*.js'],
    logging: true,
  };
};
