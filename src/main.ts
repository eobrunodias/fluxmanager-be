import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import swaggerConfig from "./configs/swagger.config";
import globalConfig from "./configs/global";
import { NestExpressApplication } from "@nestjs/platform-express";
import envs from "./configs/verify-envs";
import { Logger } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const logger = new Logger("BootstrapApplication");

  swaggerConfig(app);
  globalConfig(app);

  await app.listen(envs.PORT, () => {
    logger.verbose(`Server running http://localhost:${envs.PORT}/api/v1`);
  });
}
void bootstrap();
