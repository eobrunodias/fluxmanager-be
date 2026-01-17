import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from "@nestjs/common";
import { InventoryMovementsService } from "./inventory-movements.service";
import { CreateInventoryMovementDto } from "./dto/create-inventory-movement.dto";
import { UpdateInventoryMovementDto } from "./dto/update-inventory-movement.dto";
import { InventoryMovement } from "./entities/inventory-movement.entity";

@Controller("inventory-movements")
export class InventoryMovementsController {
  constructor(
    private readonly inventoryMovementsService: InventoryMovementsService,
  ) {}

  @Post()
  create(
    @Body() createInventoryMovementDto: CreateInventoryMovementDto,
  ): Promise<InventoryMovement> {
    return this.inventoryMovementsService.create(createInventoryMovementDto);
  }

  @Get()
  findAll(): Promise<InventoryMovement[]> {
    return this.inventoryMovementsService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<InventoryMovement> {
    return this.inventoryMovementsService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateInventoryMovementDto: UpdateInventoryMovementDto,
  ): Promise<InventoryMovement> {
    return this.inventoryMovementsService.update(
      id,
      updateInventoryMovementDto,
    );
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<InventoryMovement> {
    return this.inventoryMovementsService.remove(id);
  }
}
