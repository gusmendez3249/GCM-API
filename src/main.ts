import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //Pipe para realizar la validación de forma global
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

//?POSTGRES
//! npm i pg
//! npm i @types/pg


//?MYSQL
//! npm i mysql2
//! npm i @types/mysql


//! git commit -a -m "fix: Uso de providers (pg, mysql) para conexión a base de datos"