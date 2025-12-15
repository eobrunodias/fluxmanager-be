import { INestApplication, ValidationPipe } from "@nestjs/common";

export default (app: INestApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.setGlobalPrefix("api/v1");
  // app.useGlobalFilters(new GlobalExceptionFilter());
};
