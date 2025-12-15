import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from "@nestjs/common";
import { Request } from "express";

export const ParamId = createParamDecorator(
  (type: "int" | "string" = "string", ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    const id = request.params.id;

    if (!id) {
      throw new BadRequestException("Param id is required");
    }

    if (type === "int") {
      const parsed = Number(id);
      if (isNaN(parsed)) {
        throw new BadRequestException("Param id must be a number");
      }
      return parsed;
    }

    return id;
  },
);
