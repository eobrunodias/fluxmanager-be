import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateOrderItemDto } from "./dto/create-order-item.dto";
import { UpdateOrderItemDto } from "./dto/update-order-item.dto";
import { OrderItemsRepository } from "./repositories/order-items.repository";

@Injectable()
export class OrderItemsService {
  constructor(private readonly repository: OrderItemsRepository) {}

  async create(createOrderItemDto: CreateOrderItemDto) {
    if (!createOrderItemDto)
      throw new BadRequestException("Data ordemItem is required");

    const { productId, orderId } = createOrderItemDto;

    return this.repository.createOrderItem(
      createOrderItemDto,
      productId,
      orderId,
    );
  }

  async findAll() {
    return this.repository.findAllOrderItems();
  }

  async findOne(id: string) {
    if (!id) throw new BadRequestException("Id is required");
    return this.repository.findOrderItemById(id);
  }

  async update(id: string, updateOrderItemDto: UpdateOrderItemDto) {
    if (!id) throw new BadRequestException("Id is required");
    if (!updateOrderItemDto)
      throw new BadRequestException("Data orderItem is required");

    return this.repository.updatedOrderItem(id, updateOrderItemDto);
  }

  async remove(id: string) {
    if (!id) throw new BadRequestException("Id is required");
    return this.repository.deleteOrderItem(id);
  }
}
