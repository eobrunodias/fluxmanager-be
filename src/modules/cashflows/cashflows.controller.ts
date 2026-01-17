import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";

import { CashflowsService } from "./cashflows.service";
import { CreateCashflowsDto } from "./dto/create-cashflows.dto";
import { UpdateCashflowsDto } from "./dto/update-cashflows.dto";
import { Cashflow } from "./entities/cashflow.entity";

@Controller("cashflow")
export class CashflowsController {
  constructor(private readonly cashflowService: CashflowsService) {}

  @Post()
  create(
    @Body() createCashflowDto: CreateCashflowsDto,
    @Body("orderId") orderId: string,
  ): Promise<Cashflow> {
    return this.cashflowService.create(createCashflowDto, orderId);
  }

  @Get()
  findAll(): Promise<Cashflow[]> {
    return this.cashflowService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<Cashflow> {
    return this.cashflowService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCashflowDto: UpdateCashflowsDto,
  ): Promise<Cashflow> {
    return this.cashflowService.update(id, updateCashflowDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<Cashflow> {
    return this.cashflowService.remove(id);
  }
}
