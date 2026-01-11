import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { OrdersRepository } from "./repositories/orders.repository";

@Injectable()
export class OrdersService {
  constructor(private readonly repository: OrdersRepository) {}

  async create(createOrderDto: CreateOrderDto) {
    if (!createOrderDto)
      throw new BadRequestException("Request body is required");
    return this.repository.createOrder(createOrderDto);
  }

  async findAll() {
    return this.repository.findAllOrders();
  }

  async findOne(id: string) {
    if (!id) throw new BadRequestException("Order not found");
    return await this.repository.findOrderById(id);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    if (!id) throw new BadRequestException("Order not found");
    return await this.repository.updatedOrder(id, updateOrderDto);
  }

  async remove(id: string) {
    if (!id) throw new BadRequestException("Order not found");
    return await this.repository.deleteOrder(id);
  }
}
