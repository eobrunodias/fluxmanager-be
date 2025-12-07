import { Module } from "@nestjs/common";
import { InventoryMovementsService } from "./inventory-movements.service";
import { InventoryMovementsController } from "./inventory-movements.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { InventoryMovement } from "./entities/inventory-movement.entity";

@Module({
  imports: [TypeOrmModule.forFeature([InventoryMovement])],
  controllers: [InventoryMovementsController],
  providers: [InventoryMovementsService],
})
export class InventoryMovementsModule {}
