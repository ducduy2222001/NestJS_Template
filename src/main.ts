import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
// import { ValidateInputPipe } from './core/pipes/validate.pipe';
import { BadRequestExceptionFilter } from './core/custom-response/bad-request.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api/v1');

  // handle all user input validation globally
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new BadRequestExceptionFilter());
  await app.listen(3000);
}
bootstrap();
