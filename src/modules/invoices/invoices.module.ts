import { InvoicesService } from "./invoices.service";
import { InvoicesController } from "./invoices.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Invoice } from "./entities/invoice.entity";
import { InvoicesRepository } from "./repositories/invoices.repository";
import { OrdersModule } from "../orders/orders.module";
import { Module } from "@nestjs/common";

@Module({
  imports: [TypeOrmModule.forFeature([Invoice]), OrdersModule],
  controllers: [InvoicesController],
  providers: [InvoicesService, InvoicesRepository],
  exports: [InvoicesRepository],
})
export class InvoicesModule {}
