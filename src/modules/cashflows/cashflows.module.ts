import { Module } from "@nestjs/common";
import { CashflowsService } from "./cashflows.service";
import { CashflowsController } from "./cashflows.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cashflow } from "./entities/cashflow.entity";
import { Order } from "../orders/entities/order.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Cashflow, Order])],
  controllers: [CashflowsController],
  providers: [CashflowsService],
})
export class CashflowsModule {}
