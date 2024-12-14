import { protobufPackage } from '@libs-common';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { OrdersModule } from './orders.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    OrdersModule,
    {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../orders.proto'),
        package: protobufPackage,
      },
    },
  );

  app.listen();
}
bootstrap();
