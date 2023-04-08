import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import "reflect-metadata"
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as session from 'express-session';
import { ConfigService } from '@nestjs/config';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

async function bootstrap() {


  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const config = new DocumentBuilder().setTitle('Grove')
                      .setDescription("Grove API Application")
                      .setVersion('v1')
                      .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.enableCors({
    origin:["http://localhost:3000"],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    credentials: true,
  })
  app.use(
    session({
      secret: configService.get('SESSION_SECRET'),
      resave: false,
      saveUninitialized: false,
    }),
  );
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  
  await app.listen(5000);
}
bootstrap();
