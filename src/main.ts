// eslint-disable-next-line @typescript-eslint/no-require-imports
import basicAuth = require('express-basic-auth'); //Por corregir
import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { ConfigService } from '@nestjs/config';
import * as bodyParser from 'body-parser';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: false });

  app.use(bodyParser.urlencoded({ extended: true }));

  const configService = app.get(ConfigService);

  const swaggerUser = configService.get<string>('SWAGGER_USER') || 'admin';
  const swaggerPassword =
    configService.get<string>('SWAGGER_PASSWORD') || 'password123';

  app.use(
    '/docs',
    basicAuth({
      challenge: true,
      users: { [swaggerUser]: swaggerPassword },
    }),
  );

  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('ProjectZen API')
    .setDescription('API for managing the web app "ProjectZen"')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const allowedHeaders = configService.get('app.cors.allowedHeaders');
  const allowedMethods = configService.get('app.cors.allowedMethods');

  app.enableCors({
    origin: true,
    allowedHeaders,
    methods: allowedMethods,
    credentials: true,
  });
  app.use(
    helmet({
      contentSecurityPolicy: false,
    }),
  );
  app.use(
    '/docs/swagger-ui',
    express.static(join(__dirname, '../node_modules/swagger-ui-dist')),
  );
  await app.listen(configService.get<number>('APP_PORT') || 3000);
}
bootstrap();
