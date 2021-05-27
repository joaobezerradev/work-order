import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const port = process.env.PORT;

  app
    .listen(parseInt(port.toString(), 10), '0.0.0.0')
    .then(() => {
      Logger.log(`API Listen on ${port}`);
    })
    .catch((error) => Logger.error(error));
}
bootstrap();
