import { INestApplication, ValidationPipe } from "@nestjs/common";
import { TypeOrmExceptionFilter } from "src/common/filters/typeorm-exception.filter";

export default (app: INestApplication) => {
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  app.setGlobalPrefix("api/v1");
  app.useGlobalFilters(new TypeOrmExceptionFilter());
};
