import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateInventoryMovementDto } from "./dto/create-inventory-movement.dto";
import { UpdateInventoryMovementDto } from "./dto/update-inventory-movement.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { InventoryMovement } from "./entities/inventory-movement.entity";
import { Repository } from "typeorm";
import { Order } from "../orders/entities/order.entity";
import { Product } from "../products/entities/product.entity";

@Injectable()
export class InventoryMovementsService {
  constructor(
    @InjectRepository(InventoryMovement)
    private readonly invetoryMovementRepository: Repository<InventoryMovement>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(createInventoryMovementDto: CreateInventoryMovementDto) {
    if (!createInventoryMovementDto)
      throw new BadRequestException("Data inventoryMovement is required");

    const { productId, orderId, ...dto } = createInventoryMovementDto;

    const product = await this.productRepository.findOneBy({ id: productId });
    if (!product) throw new NotFoundException("Product not found");

    const order = await this.orderRepository.findOneBy({ id: orderId });
    if (!order) throw new NotFoundException("Order not found");

    const inventoryMovement = {
      ...dto,
      product,
      order,
    };

    const inventoryMovementCreated =
      this.invetoryMovementRepository.create(inventoryMovement);
    if (!inventoryMovementCreated)
      throw new ConflictException("inventoryMovement not created");

    const inventoryMovementSaved = await this.invetoryMovementRepository.save(
      inventoryMovementCreated,
    );
    if (!inventoryMovementSaved)
      throw new ConflictException("inventoryMovement not saved");

    return inventoryMovementSaved;
  }

  async findAll() {
    const inventoryMovements = await this.invetoryMovementRepository.find();
    if (!inventoryMovements || inventoryMovements.length === 0)
      throw new NotFoundException("inventoryMovements not found");

    return inventoryMovements;
  }

  async findOne(id: string) {
    if (!id) throw new BadRequestException("Id is required");

    const invetoryMovement = await this.invetoryMovementRepository.findOneBy({
      id,
    });
    if (!invetoryMovement)
      throw new NotFoundException("InventoryMovement not found");

    return invetoryMovement;
  }

  async update(
    id: string,
    updateInventoryMovementDto: UpdateInventoryMovementDto,
  ) {
    if (!id) throw new BadRequestException("Id is required");
    if (!updateInventoryMovementDto)
      throw new BadRequestException("Data inventoryMovement is required");

    const inventoryMovement = await this.invetoryMovementRepository.findOneBy({
      id,
    });
    if (!inventoryMovement)
      throw new NotFoundException("InventoryMovement not found");

    return inventoryMovement;
  }

  async remove(id: string) {
    if (!id) throw new BadRequestException("Id is required");

    const invetoryMovement = await this.invetoryMovementRepository.findOneBy({
      id,
    });
    if (!invetoryMovement)
      throw new NotFoundException("InventoryMovement not found");

    const inventoryMovementDeleted =
      await this.invetoryMovementRepository.delete({ id });
    if (!inventoryMovementDeleted)
      throw new ConflictException("InventoryMovement not deleted");

    return inventoryMovementDeleted;
  }
}
