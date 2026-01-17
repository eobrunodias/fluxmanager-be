import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { InventoryMovement } from "../entities/inventory-movement.entity";
import { ConflictException, NotFoundException } from "@nestjs/common";
import { UpdateInventoryMovementDto } from "../dto/update-inventory-movement.dto";
import { CreateInventoryMovementDto } from "../dto/create-inventory-movement.dto";
import { Product } from "src/modules/products/entities/product.entity";
import { Order } from "src/modules/orders/entities/order.entity";

export class InventoryMovementsRepository {
  constructor(
    @InjectRepository(InventoryMovement)
    private readonly inventoryMovementRepository: Repository<InventoryMovement>,
  ) {}

  async createInventoryMovement(
    createInventoryMovementDto: CreateInventoryMovementDto,
    order: Order,
    product: Product,
  ): Promise<InventoryMovement> {
    const inventoryMovementExists: InventoryMovement | null =
      await this.inventoryMovementRepository.findOne({
        where: {
          order: { id: order.id },
          product: { id: product.id },
        },
        relations: ["order", "product"],
      });

    if (inventoryMovementExists)
      throw new ConflictException("InventoryMovements already exists");

    const inventoryMovementCreated: InventoryMovement =
      this.inventoryMovementRepository.create({
        ...createInventoryMovementDto,
        order: order,
        product: product,
      });

    return await this.inventoryMovementRepository.save(
      inventoryMovementCreated,
    );
  }

  async findAllInventoryMovements(): Promise<InventoryMovement[]> {
    const inventoryMovements: InventoryMovement[] =
      await this.inventoryMovementRepository.find();

    if (!inventoryMovements || inventoryMovements.length === 0)
      throw new NotFoundException("InventoryMovements not found");

    return inventoryMovements;
  }

  async findInventoryMovementById(id: string): Promise<InventoryMovement> {
    const inventoryMovement: InventoryMovement | null =
      await this.inventoryMovementRepository.findOneBy({
        id,
      });

    if (!inventoryMovement)
      throw new NotFoundException("InventoryMovement not found");

    return inventoryMovement;
  }

  async updatedInventoryMovement(
    id: string,
    updateInventoryMovementDto: UpdateInventoryMovementDto,
  ): Promise<InventoryMovement> {
    const inventoryMovement: InventoryMovement | undefined =
      await this.inventoryMovementRepository.preload({
        id,
        ...updateInventoryMovementDto,
      });

    if (!inventoryMovement)
      throw new NotFoundException("InventoryMovement not found");

    return this.inventoryMovementRepository.save(inventoryMovement);
  }

  async deleteInventoryMovement(id: string): Promise<InventoryMovement> {
    const inventoryMovement: InventoryMovement | null =
      await this.inventoryMovementRepository.findOneBy({
        id,
      });
    if (!inventoryMovement)
      throw new NotFoundException("InventoryMovement not found");

    await this.inventoryMovementRepository.delete(id);

    return inventoryMovement;
  }
}
