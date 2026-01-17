import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateInventoryMovementDto } from "./dto/create-inventory-movement.dto";
import { UpdateInventoryMovementDto } from "./dto/update-inventory-movement.dto";
import { InventoryMovementsRepository } from "./repositories/inventory-movements.repository";
import { ProductsRepository } from "../products/repositories/products.repository";
import { OrdersRepository } from "../orders/repositories/orders.repository";
import { Order } from "../orders/entities/order.entity";
import { Product } from "../products/entities/product.entity";
import { InventoryMovement } from "./entities/inventory-movement.entity";

@Injectable()
export class InventoryMovementsService {
  constructor(
    private readonly repository: InventoryMovementsRepository,
    private readonly orderRepository: OrdersRepository,
    private readonly productRepository: ProductsRepository,
  ) {}

  async create(
    createInventoryMovementDto: CreateInventoryMovementDto,
  ): Promise<InventoryMovement> {
    if (!createInventoryMovementDto)
      throw new BadRequestException("Data inventoryMovement is required");

    const { orderId, productId } = createInventoryMovementDto;

    const order: Order = await this.orderRepository.findOrderById(orderId);
    const product: Product =
      await this.productRepository.findProductById(productId);

    return this.repository.createInventoryMovement(
      createInventoryMovementDto,
      order,
      product,
    );
  }

  async findAll(): Promise<InventoryMovement[]> {
    return this.repository.findAllInventoryMovements();
  }

  async findOne(id: string): Promise<InventoryMovement> {
    if (!id) throw new BadRequestException("Id is required");
    return this.repository.findInventoryMovementById(id);
  }

  async update(
    id: string,
    updateInventoryMovementDto: UpdateInventoryMovementDto,
  ): Promise<InventoryMovement> {
    if (!id) throw new BadRequestException("Id is required");
    if (!updateInventoryMovementDto)
      throw new BadRequestException("Data inventoryMovement is required");

    return this.repository.updatedInventoryMovement(
      id,
      updateInventoryMovementDto,
    );
  }

  async remove(id: string): Promise<InventoryMovement> {
    if (!id) throw new BadRequestException("Id is required");
    return this.repository.deleteInventoryMovement(id);
  }
}
