import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from "@nestjs/common";
import { QueryFailedError } from "typeorm";
import { Response } from "express";

interface DatabaseError {
  code: string;
  detail?: string;
}

@Catch(QueryFailedError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const error = exception as DatabaseError;

    // Handling Unique Violation (Postgres: 23505, MySQL: 1062)
    if (error.code === "23505" || error.code === "1062") {
      return response.status(HttpStatus.CONFLICT).json({
        statusCode: HttpStatus.CONFLICT,
        message: "Duplicate record: SKU or barcode already exists.",
        error: "Conflict",
      });
    }

    // Generic database error
    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: "Database internal error",
    });
  }
}
