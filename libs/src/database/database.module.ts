import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseSetting } from './database.config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (): Promise<object> => {
        return {
          ...databaseSetting(process.env),
          autoLoadEntities: false,
          retryAttempts: 2,
          logging: true,
          poolSize: parseInt(process.env.DATABASE_POOL_SIZE || '5', 10),
          applicationName: `${process.env.APPLICATION_NAME}_app`,
          maxQueryExecutionTime: 1000,
          canRetry: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
