import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateInventoryMovementDto } from "./dto/create-inventory-movement.dto";
import { UpdateInventoryMovementDto } from "./dto/update-inventory-movement.dto";
import { InventoryMovementsRepository } from "./repositories/inventory-movements.repository";

@Injectable()
export class InventoryMovementsService {
  constructor(private readonly repository: InventoryMovementsRepository) {}

  async create(
    createInventoryMovementDto: CreateInventoryMovementDto,
    orderId: string,
    productId: string,
  ) {
    if (!createInventoryMovementDto)
      throw new BadRequestException("Data inventoryMovement is required");
    if (!orderId) throw new BadRequestException("orderId is required");
    if (!productId) throw new BadRequestException("productId is required");

    return this.repository.createInventoryMovement(
      createInventoryMovementDto,
      orderId,
      productId,
    );
  }

  async findAll() {
    return this.repository.findAllInventoryMovements();
  }

  async findOne(id: string) {
    if (!id) throw new BadRequestException("Id is required");
    return this.repository.findInventoryMovementById(id);
  }

  async update(
    id: string,
    updateInventoryMovementDto: UpdateInventoryMovementDto,
  ) {
    if (!id) throw new BadRequestException("Id is required");
    if (!updateInventoryMovementDto)
      throw new BadRequestException("Data inventoryMovement is required");

    return this.repository.updatedInventoryMovement(
      id,
      updateInventoryMovementDto,
    );
  }

  async remove(id: string) {
    if (!id) throw new BadRequestException("Id is required");
    return this.repository.deleteInventoryMovement(id);
  }
}
