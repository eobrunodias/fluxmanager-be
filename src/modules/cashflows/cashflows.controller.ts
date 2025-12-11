import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from "@nestjs/common";

import { CashflowsService } from "./cashflows.service";
import { CreateCashflowsDto } from "./dto/create-cashflows.dto";
import { UpdateCashflowsDto } from "./dto/update-cashflows.dto";

@Controller()
export class CashflowsController {
  constructor(private readonly cashflowService: CashflowsService) {}

  @Post("orders/:orderId/cashflow")
  create(
    @Param("orderId", ParseUUIDPipe) orderId: string,
    @Body() createCashflowDto: CreateCashflowsDto,
  ) {
    console.log("orderId: ", orderId);
    return this.cashflowService.create(createCashflowDto, orderId);
  }

  @Get("cashflows")
  findAll() {}

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.cashflowService.findOne(id);
  }

  @Patch("cashflows/:id")
  update(
    @Param("id") id: string,
    @Body() updateCashflowDto: UpdateCashflowsDto,
  ) {
    return this.cashflowService.update(id, updateCashflowDto);
  }

  @Delete("cashflows/:id")
  remove(@Param("id") id: string) {
    return this.cashflowService.remove(id);
  }
}
