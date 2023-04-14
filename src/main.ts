import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cors from 'cors';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // enable CORS for a specific origin
  app.use(
    cors({
      origin: 'http://localhost:5173',
    }),
  );
  await app.listen(3000);
}
bootstrap();
