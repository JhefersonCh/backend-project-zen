import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as basicAuth from 'express-basic-auth';
import { ConfigService } from '@nestjs/config';
import * as bodyParser from 'body-parser';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

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

  const config = new DocumentBuilder()
    .setTitle('ProjectZen API')
    .setDescription('API for managing the web app "ProjectZen"')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
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
    origin: true, // origin,
    allowedHeaders,
    methods: allowedMethods,
    credentials: true,
  });
  app.use(helmet());
  await app.listen(configService.get<number>('APP_PORT') || 3000);
}
bootstrap();