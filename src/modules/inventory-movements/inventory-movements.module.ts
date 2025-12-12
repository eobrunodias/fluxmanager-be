import { Module } from "@nestjs/common";
import { InventoryMovementsService } from "./inventory-movements.service";
import { InventoryMovementsController } from "./inventory-movements.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InventoryMovement } from "./entities/inventory-movement.entity";
import { Product } from "../products/entities/product.entity";
import { Order } from "../orders/entities/order.entity";

@Module({
  imports: [TypeOrmModule.forFeature([InventoryMovement, Product, Order])],
  controllers: [InventoryMovementsController],
  providers: [InventoryMovementsService],
})
export class InventoryMovementsModule {}
