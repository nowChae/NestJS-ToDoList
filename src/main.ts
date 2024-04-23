import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(AppModule);

  app.use(express.static(join(__dirname, '..', 'static')));

  const PORT = process.env.PORT;
  await app.listen(PORT);
}

bootstrap();
