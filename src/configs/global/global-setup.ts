import { registerAs } from "@nestjs/config";

export default registerAs("globalConfig", () => ({
  database: {
    type: process.env.DATABASE_TYPE as "better-sqlite3",
    database: process.env.DATABASE_DATABASE,
    autoLoadEntities: Boolean(process.env.DATABASE_AUTOLOADENTITIES),
    synchronize: Boolean(process.env.DATABASE_SYNCHRONIZE),
  },
  environment: process.env.NODE_ENV || "development",
}));
