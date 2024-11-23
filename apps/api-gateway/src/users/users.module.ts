import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_SERVICE } from './constants';
import { join } from 'path';
import { protobufPackage } from '@app/common';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: AUTH_SERVICE,
        transport: Transport.GRPC,
        options: {
          package: protobufPackage,
          protoPath: join(__dirname, '../auth.proto'),
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
