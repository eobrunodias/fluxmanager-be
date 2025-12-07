import { Module } from "@nestjs/common";
import { CashflowService } from "./cashflow.service";
import { CashflowController } from "./cashflow.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Cashflow } from "./entities/cashflow.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Cashflow])],
  controllers: [CashflowController],
  providers: [CashflowService],
})
export class CashflowModule {}
