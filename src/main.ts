import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  await app.listen(3000);
  app.disable('x-powered-by');
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
