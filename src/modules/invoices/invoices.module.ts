import { Module } from "@nestjs/common";
import { InvoicesService } from "./invoices.service";
import { InvoicesController } from "./invoices.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Invoice } from "./entities/invoice.entity";
import { Order } from "../orders/entities/order.entity";
import { InvoicesRepository } from "./repositories/invoices.repository";

@Module({
  imports: [TypeOrmModule.forFeature([Invoice])],
  controllers: [InvoicesController],
  providers: [InvoicesService, InvoicesRepository],
})
export class InvoicesModule {}
