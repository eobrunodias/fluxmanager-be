import envs from "./verify-envs";
import { INestApplication, Logger } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

export default (app: INestApplication) => {
  if (envs.NODE_ENV !== "development") return;

  const logger = new Logger("Swagger");

  const config = new DocumentBuilder()
    .setTitle("Fluxmanager API")
    .setDescription("API documentation for Fluxmanager")
    .setVersion("1.0")
    .addTag("API")
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  const prefix = envs.SWAGGER_PREFIX;
  const port = envs.PORT;

  SwaggerModule.setup(`api/v1/${prefix}`, app, document);
  logger.verbose(
    `Swagger is running on http://localhost:${port}/api/v1/${prefix}`,
  );
};
