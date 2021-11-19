import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import AppModule from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5500',
    credentials: true,
  });

  app.use(cookieParser());

  const options = new DocumentBuilder()
    .setTitle('Domini')
    .setDescription('Domini work')
    .setVersion('2.0')
    .addTag('Domini')
    .build();

  const catDocument = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('api/swagger', app, catDocument);

  await app.listen(3000);
}
bootstrap();
