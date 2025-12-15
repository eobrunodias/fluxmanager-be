import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { featureModules } from "src/modules";

@Module({
  imports: [
    ...featureModules,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          type: "postgres",
          host: process.env.DB_HOST,
          port: parseInt(process.env.DB_PORT || "5432", 10),
          username: process.env.DB_USERNAME,
          password: process.env.DB_PASSWORD,
          database: process.env.DB_DB,
          synchronize: process.env.DB_SYNCHRONIZE === "1",
          autoLoadEntities: process.env.DB_AUTOLOADENTITIES === "1",
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
