import { InjectRepository } from "@nestjs/typeorm";
import { OrderItem } from "../entities/order-item.entity";
import { Repository } from "typeorm";
import { NotFoundException } from "@nestjs/common";
import { UpdateOrderItemDto } from "../dto/update-order-item.dto";
import { CreateOrderItemDto } from "../dto/create-order-item.dto";
import { Product } from "src/modules/products/entities/product.entity";
import { Order } from "src/modules/orders/entities/order.entity";

export class OrderItemsRepository {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemsRepository: Repository<OrderItem>,
  ) {}

  async createOrderItem(
    createOrderItemDto: CreateOrderItemDto,
    product: Product,
    order: Order,
  ): Promise<OrderItem> {
    const orderItemExists: OrderItem | null =
      await this.orderItemsRepository.findOne({
        where: {
          product: { id: product.id },
          order: { id: order.id },
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

  async findAllOrderItems(): Promise<OrderItem[]> {
    const orderItems: OrderItem[] = await this.orderItemsRepository.find();
    if (!orderItems || orderItems.length === 0)
      throw new NotFoundException("OrderItems not found");
    return orderItems;
  }

  async findOrderItemById(id: string): Promise<OrderItem> {
    const orderItem: OrderItem | null =
      await this.orderItemsRepository.findOneBy({ id });
    if (!orderItem) throw new NotFoundException("OrderItem not found");
    return orderItem;
  }

  async updatedOrderItem(
    id: string,
    updateOrderItemDto: UpdateOrderItemDto,
  ): Promise<OrderItem> {
    const orderItemPreloaded: OrderItem | undefined =
      await this.orderItemsRepository.preload({
        id: id,
        ...updateOrderItemDto,
      });

    if (!orderItemPreloaded) throw new NotFoundException("OrderItem not found");

    return await this.orderItemsRepository.save(orderItemPreloaded);
  }

  async deleteOrderItem(id: string): Promise<OrderItem> {
    const orderItem = await this.orderItemsRepository.findOneBy({ id });
    if (!orderItem) throw new NotFoundException("orderItem not found");

    await this.orderItemsRepository.delete(id);

    return orderItem;
  }
}
