import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors()
  app.useGlobalPipes(new ValidationPipe())
  const configService = app.get(ConfigService)
  const appConfig = configService.get<{host:string, port:number}>('app')
  await app.listen(appConfig.port, appConfig.host);
}
bootstrap();
