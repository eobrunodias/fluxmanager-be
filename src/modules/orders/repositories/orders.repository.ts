import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "../entities/order.entity";
import { NotFoundException } from "@nestjs/common";
import { UpdateOrderDto } from "../dto/update-order.dto";
import { CreateOrderDto } from "../dto/create-order.dto";
import { User } from "src/modules/users/entities/user.entity";
import { Client } from "src/modules/clients/entities/client.entity";

export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private readonly repository: Repository<Order>,
  ) {}

  async createOrder(
    createOrderDto: CreateOrderDto,
    user: User,
    client: Client,
  ): Promise<Order> {
    const order = {
      ...createOrderDto,
      client,
      user,
    };

    const createdOrder: Order = this.repository.create(order);
    await this.repository.save(createdOrder);

    return createdOrder;
  }

  async findAllOrders(): Promise<Order[]> {
    const orders: Order[] = await this.repository.find();
    if (!orders || orders.length === 0)
      throw new NotFoundException("Orders not found");

    return orders;
  }

  async findOrderById(id: string): Promise<Order> {
    const order: Order | null = await this.repository.findOneBy({ id });
    if (!order) throw new NotFoundException("Order not found");

    return order;
  }

  async updatedOrder(
    id: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    const order: Order | undefined = await this.repository.preload({
      id,
      ...updateOrderDto,
      client: {
        id: updateOrderDto.client,
      },
      user: {
        id: updateOrderDto.user,
      },
    });

    if (!order) throw new NotFoundException("Order not found");

    return await this.repository.save(order);
  }

  async deleteOrder(id: string): Promise<Order> {
    const order: Order | null = await this.repository.findOneBy({ id });
    if (!order) throw new NotFoundException("Order not found");

    await this.repository.remove(order);
    return order;
  }
}
