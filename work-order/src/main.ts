import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  const options = new DocumentBuilder()
    .setTitle('API Work-order')
    .setDescription('lorem ipsum')
    .setVersion('1.0.0')
    .addBearerAuth({ in: 'header', type: 'http' })
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT;
  app
    .listen(parseInt(port.toString(), 10), '0.0.0.0')
    .then(() => {
      Logger.log(`API Listen on ${port}`);
    })
    .catch((error) => Logger.error(error));
}
bootstrap();
