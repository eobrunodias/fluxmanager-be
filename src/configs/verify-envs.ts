import "dotenv/config";
import { z } from "zod";

const schema = z.object({
  BASE_URL: z.string().url().optional(),
  NODE_ENV: z.enum(["development", "production", "test"]),
  PORT: z.coerce.number(),

  SWAGGER_PREFIX: z.string().default("docs"),

  POSTGRES_HOST: z.string(),
  POSTGRES_PORT: z.coerce.number(),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  POSTGRES_SSL: z
    .enum(["require", "disable"])
    .transform((value) => value === "require")
    .optional(),
});

export default schema.parse(process.env);
