import { PartialType } from "@nestjs/mapped-types";
import { CreateCashflowsDto } from "./create-cashflows.dto";

export class UpdateCashflowsDto extends PartialType(CreateCashflowsDto) {}
