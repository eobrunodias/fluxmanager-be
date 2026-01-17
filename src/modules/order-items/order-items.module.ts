import { Module } from "@nestjs/common";
import { OrderItemsService } from "./order-items.service";
import { OrderItemsController } from "./order-items.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderItem } from "./entities/order-item.entity";
import { OrderItemsRepository } from "./repositories/order-items.repository";
import { ProductsModule } from "../products/products.module";
import { OrdersModule } from "../orders/orders.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderItem]),
    ProductsModule,
    OrdersModule,
  ],
  controllers: [OrderItemsController],
  providers: [OrderItemsService, OrderItemsRepository],
  exports: [OrderItemsRepository],
})
export class OrderItemsModule {}
