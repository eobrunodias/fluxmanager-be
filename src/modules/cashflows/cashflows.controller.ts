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

@Controller("cashflow")
export class CashflowsController {
  constructor(private readonly cashflowService: CashflowsService) {}

  @Post()
  create(@Body() createCashflowDto: CreateCashflowsDto) {
    return this.cashflowService.create(createCashflowDto);
  }

  @Get()
  findAll() {
    return this.cashflowService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.cashflowService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateCashflowDto: UpdateCashflowsDto,
  ) {
    return this.cashflowService.update(id, updateCashflowDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.cashflowService.remove(id);
  }
}
