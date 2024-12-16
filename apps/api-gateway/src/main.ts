import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionsFilter, setupSwagger } from 'libs/src';
import * as compression from 'compression';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      skipUndefinedProperties: false,
      skipMissingProperties: false,
      skipNullProperties: false,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      whitelist: true,
      transform: true,
      validateCustomDecorators: true,
    }),
  );

  app.useGlobalFilters(new AllExceptionsFilter());

  app.enableCors({
    origin: process.env.CORS_ORIGIN || `http://localhost:${3000}`,
    methods: 'GET,PUT,PATCH,POST,DELETE,OPTIONS',
  });

  app.use(compression());
  app.use(helmet());
  setupSwagger(app);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
