import { Module } from "@nestjs/common";
import { CashflowsService } from "./cashflows.service";
import { CashflowsController } from "./cashflows.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cashflow } from "./entities/cashflow.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Cashflow])],
  controllers: [CashflowsController],
  providers: [CashflowsService],
})
export class CashflowsModule {}
