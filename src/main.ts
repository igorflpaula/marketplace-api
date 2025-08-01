import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: true, // Em produção, troque para o domínio do seu front-end: 'http://localhost:3000'
    credentials: true,
  });

  await app.listen(3333);
}
bootstrap();
