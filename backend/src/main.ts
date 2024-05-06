/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as bodyParser from "body-parser";
import helmet from "helmet";
import { HttpException, HttpStatus, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.enable("trust proxy");
  app.set("etag", "strong");

  app.use(
    bodyParser.json({ limit: "10mb" }),
    bodyParser.urlencoded({ limit: "10mb", extended: true }),
  );
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: [`'self'`],
          styleSrc: [`'self'`, `'unsafe-inline'`],
          imgSrc: [`'self'`, "data:", "validator.swagger.io"],
          scriptSrc: [`'self'`, `https: 'unsafe-inline'`],
        },
      },
    }),
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidUnknownValues: false,
      validateCustomDecorators: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      exceptionFactory: (errors: ValidationError[]) =>
        new HttpException(
          {
            status: HttpStatus.BAD_REQUEST,
            errors: errors.reduce(
              (accumulator, currentValue) => ({
                ...accumulator,
                [currentValue.property]: Object.values(
                  currentValue.constraints,
                ).join(", "),
              }),
              {},
            ),
          },
          HttpStatus.BAD_REQUEST,
        ),
    }),
  );

  app.enableCors(); 
  await app.listen(3000);

}
bootstrap();
