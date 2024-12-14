import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { entities } from '../entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: async (): Promise<object> => {
        return {
          type: 'postgres',
          host: process.env.DATABASE_HOST,
          port: parseInt(process.env.DATABASE_PORT ?? '3306', 10),
          username: process.env.DATABASE_USER,
          password: process.env.DATABASE_PASSWORD,
          database: process.env.DATABASE_NAME,
          autoLoadEntities: false,
          retryAttempts: 2,
          migrations: [],
          logging: true,
          entities: entities,
          poolSize: parseInt(process.env.DATABASE_POOL_SIZE || '5', 10),
          applicationName: `${process.env.APPLICATION_NAME}_app`,
          maxQueryExecutionTime: 1000,
          canRetry: true,

          // DO NOT USE THIS IN PRODUCTION
          synchronize: true,
        };
      },
    }),
  ],
})
export class DatabaseModule {}
