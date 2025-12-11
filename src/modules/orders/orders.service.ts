import {
  BadRequestException,
  ConflictException,
  Injectable,
} from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { Repository } from "typeorm";
import { Order } from "./entities/order.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly repository: Repository<Order>,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    if (!createOrderDto) throw new BadRequestException("Invalid data order");

    const order = {
      ...createOrderDto,
      client: {
        id: createOrderDto.client,
      },
      user: {
        id: createOrderDto.user,
      },
    };

    const orderCreated = this.repository.create(order);
    const orderSaved = await this.repository.save(orderCreated);

    if (!orderSaved) throw new ConflictException("Order not created");

    return orderSaved;
  }

  async findAll() {
    const orders = await this.repository.find();

    if (!orders) throw new BadRequestException("Orders not found");

    return orders;
  }

  async findOne(id: string) {
    const order = await this.repository.findOneBy({ id });
    if (!order) throw new BadRequestException("Order not found");

    return order;
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const order = await this.repository.findOneBy({ id });
    if (!order) throw new BadRequestException("Order not found");

    const updatedOrder = {
      ...order,
      ...updateOrderDto,
      client: {
        id: updateOrderDto.client,
      },
      user: {
        id: updateOrderDto.user,
      },
    };

    const preloadedOrder = await this.repository.preload(updatedOrder);
    if (!preloadedOrder) throw new ConflictException("Order not preloaded");

    const savedOrder = await this.repository.save(preloadedOrder);
    if (!savedOrder) throw new ConflictException("Order not updated");

    return savedOrder;
  }

  async remove(id: string) {
    const order = await this.repository.findOneBy({ id });

    if (!order) throw new BadRequestException("Order not found");
    await this.repository.delete({ id });

    return order;
  }
}
