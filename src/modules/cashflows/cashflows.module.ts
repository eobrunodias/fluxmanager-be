import { Module } from "@nestjs/common";
import { CashflowsService } from "./cashflows.service";
import { CashflowsController } from "./cashflows.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cashflow } from "./entities/cashflow.entity";
import { CashflowsRepository } from "./repositories/cashflows.repository";
import { OrdersModule } from "../orders/orders.module";

@Module({
  imports: [TypeOrmModule.forFeature([Cashflow]), OrdersModule],
  controllers: [CashflowsController],
  providers: [CashflowsService, CashflowsRepository],
  exports: [CashflowsRepository],
})
export class CashflowsModule {}
