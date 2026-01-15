import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { InventoryMovement } from "../entities/inventory-movement.entity";
import { ConflictException, NotFoundException } from "@nestjs/common";
import { UpdateInventoryMovementDto } from "../dto/update-inventory-movement.dto";
import { CreateInventoryMovementDto } from "../dto/create-inventory-movement.dto";
import { OrdersRepository } from "src/modules/orders/repositories/orders.repository";
import { ProductsRepository } from "src/modules/products/repositories/products.repository";

export class InventoryMovementsRepository {
  constructor(
    @InjectRepository(InventoryMovement)
    private readonly inventoryMovementRepository: Repository<InventoryMovement>,
    private readonly orderRepository: OrdersRepository,
    private readonly productRepository: ProductsRepository,
  ) {}

  async createInventoryMovement(
    createInventoryMovementDto: CreateInventoryMovementDto,
    orderId: string,
    productId: string,
  ) {
    const order = await this.orderRepository.findOrderById(orderId);
    const product = await this.productRepository.findProductById(productId);

    const inventoryMovementExists =
      await this.inventoryMovementRepository.findOne({
        where: {
          order: { id: orderId },
          product: { id: productId },
        },
        relations: ["order", "product"],
      });

    if (inventoryMovementExists)
      throw new ConflictException("InventoryMovements already exists");

    const inventoryMovementCreated = this.inventoryMovementRepository.create({
      ...createInventoryMovementDto,
      order: order,
      product: product,
    });

    return await this.inventoryMovementRepository.save(
      inventoryMovementCreated,
    );
  }

  async findAllInventoryMovements() {
    const inventoryMovements = await this.inventoryMovementRepository.find();

    if (!inventoryMovements || inventoryMovements.length === 0)
      throw new NotFoundException("InventoryMovements not found");

    return inventoryMovements;
  }

  async findInventoryMovementById(id: string) {
    const inventoryMovement = await this.inventoryMovementRepository.findOneBy({
      id,
    });

    if (!inventoryMovement)
      throw new NotFoundException("InventoryMovement not found");

    return inventoryMovement;
  }

  async updatedInventoryMovement(
    id: string,
    updateInventoryMovementDto: UpdateInventoryMovementDto,
  ) {
    const inventoryMovement = await this.inventoryMovementRepository.preload({
      id,
      ...updateInventoryMovementDto,
    });

    if (!inventoryMovement)
      throw new NotFoundException("InventoryMovement not found");

    return this.inventoryMovementRepository.save(inventoryMovement);
  }

  async deleteInventoryMovement(id: string) {
    const inventoryMovement = await this.inventoryMovementRepository.findOneBy({
      id,
    });
    if (!inventoryMovement)
      throw new NotFoundException("InventoryMovement not found");

    await this.inventoryMovementRepository.delete(id);

    return inventoryMovement;
  }
}
