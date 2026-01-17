import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateOrderItemDto } from "./dto/create-order-item.dto";
import { UpdateOrderItemDto } from "./dto/update-order-item.dto";
import { OrderItemsRepository } from "./repositories/order-items.repository";
import { OrdersRepository } from "../orders/repositories/orders.repository";
import { ProductsRepository } from "../products/repositories/products.repository";

@Injectable()
export class OrderItemsService {
  constructor(
    private readonly repository: OrderItemsRepository,
    private readonly productRepository: ProductsRepository,
    private readonly orderRepository: OrdersRepository,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto) {
    if (!createOrderItemDto)
      throw new BadRequestException("Data ordemItem is required");

    const { productId, orderId } = createOrderItemDto;

    const product = await this.productRepository.findProductById(productId);
    const order = await this.orderRepository.findOrderById(orderId);

    return this.repository.createOrderItem(createOrderItemDto, product, order);
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
