import { InjectRepository } from "@nestjs/typeorm";
import { OrderItem } from "../entities/order-item.entity";
import { Repository } from "typeorm";
import { ProductsRepository } from "src/modules/products/repositories/products.repository";
import { OrdersRepository } from "src/modules/orders/repositories/orders.repository";
import { NotFoundException } from "@nestjs/common";
import { UpdateOrderItemDto } from "../dto/update-order-item.dto";
import { CreateOrderItemDto } from "../dto/create-order-item.dto";

export class OrderItemsRepository {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemsRepository: Repository<OrderItem>,
    private readonly productRepository: ProductsRepository,
    private readonly orderRepository: OrdersRepository,
  ) {}

  async createOrderItem(
    createOrderItemDto: CreateOrderItemDto,
    productId: string,
    orderId: string,
  ) {
    const product = await this.productRepository.findProductById(productId);
    const order = await this.orderRepository.findOrderById(orderId);

    const orderItemExists = await this.orderItemsRepository.findOne({
      where: {
        product: { id: productId },
        order: { id: orderId },
      },
      relations: ["product", "order"],
    });

    if (orderItemExists)
      throw new NotFoundException("OrderItem already exists for this order");

    const orderItemsCreated = this.orderItemsRepository.create({
      ...createOrderItemDto,
      product: product,
      order: order,
    });

    return await this.orderItemsRepository.save(orderItemsCreated);
  }

  async findAllOrderItems() {
    const orderItems = await this.orderItemsRepository.find();
    if (!orderItems || orderItems.length === 0)
      throw new NotFoundException("OrderItems not found");
    return orderItems;
  }

  async findOrderItemById(id: string) {
    const orderItem = await this.orderItemsRepository.findOneBy({ id });
    if (!orderItem) throw new NotFoundException("OrderItem not found");
    return orderItem;
  }

  async updatedOrderItem(id: string, updateOrderItemDto: UpdateOrderItemDto) {
    const orderItemPreloaded = await this.orderItemsRepository.preload({
      id: id,
      ...updateOrderItemDto,
    });

    if (!orderItemPreloaded) throw new NotFoundException("OrderItem not found");

    return await this.orderItemsRepository.save(orderItemPreloaded);
  }

  async deleteOrderItem(id: string) {
    const orderItem = await this.orderItemsRepository.findOneBy({ id });
    if (!orderItem) throw new NotFoundException("orderItem not found");

    await this.orderItemsRepository.delete(id);

    return orderItem;
  }
}
