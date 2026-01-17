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
import { StockService } from "./stock.service";
import { CreateStockDto } from "./dto/create-stock.dto";
import { UpdateStockDto } from "./dto/update-stock.dto";
import { Stock } from "./entities/stock.entity";

@Controller("stock")
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post("products/:productId")
  create(
    @Param("productId", ParseUUIDPipe) productId: string,
    @Body() createStockDto: CreateStockDto,
  ): Promise<Stock> {
    return this.stockService.create(createStockDto, productId);
  }

  @Get()
  findAll(): Promise<Stock[]> {
    return this.stockService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<Stock> {
    return this.stockService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateStockDto: UpdateStockDto,
  ): Promise<Stock> {
    return this.stockService.update(id, updateStockDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<Stock> {
    return this.stockService.remove(id);
  }
}
