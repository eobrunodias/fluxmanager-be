import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Order } from "../entities/order.entity";
import { NotFoundException } from "@nestjs/common";
import { UpdateOrderDto } from "../dto/update-order.dto";
import { CreateOrderDto } from "../dto/create-order.dto";

export class OrdersRepository {
  constructor(
    @InjectRepository(Order)
    private readonly repository: Repository<Order>,
  ) {}

  async createOrder(createOrderDto: CreateOrderDto) {
    const order = {
      ...createOrderDto,
      client: {
        id: createOrderDto.client,
      },
      user: {
        id: createOrderDto.user,
      },
    };

    const createdOrder = this.repository.create(order);
    await this.repository.save(createdOrder);

    return createdOrder;
  }

  async findAllOrders() {
    const orders = await this.repository.find();
    if (!orders) throw new NotFoundException("Orders not found");

    return orders;
  }

  async findOrderById(id: string) {
    const order = await this.repository.findOneBy({ id });
    if (!order) throw new NotFoundException("Order not found");

    return order;
  }

  async updatedOrder(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.repository.preload({
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

  async deleteOrder(id: string) {
    const order = await this.repository.findOneBy({ id });
    if (!order) throw new NotFoundException("Order not found");

    await this.repository.remove(order);
    return order;
  }
}
