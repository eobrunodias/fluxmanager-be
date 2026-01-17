import { Module } from "@nestjs/common";
import { StockService } from "./stock.service";
import { StockController } from "./stock.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Stock } from "./entities/stock.entity";
import { StockRepository } from "./repositories/stock.repository";
import { ProductsModule } from "../products/products.module";

@Module({
  imports: [TypeOrmModule.forFeature([Stock]), ProductsModule],
  controllers: [StockController],
  providers: [StockService, StockRepository],
  exports: [StockService],
})
export class StockModule {}
