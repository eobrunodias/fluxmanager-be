import { Module } from "@nestjs/common";
import { OrderItemsService } from "./order-items.service";
import { OrderItemsController } from "./order-items.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderItem } from "./entities/order-item.entity";
import { Product } from "../products/entities/product.entity";
import { Order } from "../orders/entities/order.entity";

@Module({
  imports: [TypeOrmModule.forFeature([OrderItem, Product, Order])],
  controllers: [OrderItemsController],
  providers: [OrderItemsService],
})
export class OrderItemsModule {}
