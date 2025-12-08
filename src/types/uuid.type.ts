import { isUUID } from "class-validator";

type UUID = string & { __brand: "UUID" };

export function parseUUID(value: string): UUID {
  if (!isUUID(value)) throw new Error("Invalid UUID");
  return value as UUID;
}
