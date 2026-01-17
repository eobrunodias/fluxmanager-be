import { Module } from "@nestjs/common";
import { InventoryMovementsService } from "./inventory-movements.service";
import { InventoryMovementsController } from "./inventory-movements.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InventoryMovement } from "./entities/inventory-movement.entity";
import { InventoryMovementsRepository } from "./repositories/inventory-movements.repository";
import { OrdersModule } from "../orders/orders.module";
import { ProductsModule } from "../products/products.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([InventoryMovement]),
    OrdersModule,
    ProductsModule,
  ],
  controllers: [InventoryMovementsController],
  providers: [InventoryMovementsService, InventoryMovementsRepository],
  exports: [InventoryMovementsRepository],
})
export class InventoryMovementsModule {}
