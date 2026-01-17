import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";
import { OrdersRepository } from "./repositories/orders.repository";
import { Order } from "./entities/order.entity";
import { UsersRepository } from "../users/repositories/users.repository";
import { User } from "../users/entities/user.entity";
import { Client } from "../clients/entities/client.entity";
import { ClientsRepository } from "../clients/repositories/clients.repository";

@Injectable()
export class OrdersService {
  constructor(
    private readonly orderRepository: OrdersRepository,
    private readonly userRepository: UsersRepository,
    private readonly clientRepository: ClientsRepository,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    if (!createOrderDto)
      throw new BadRequestException("Request body is required");

    const { client, user } = createOrderDto;

    if (!client) throw new BadRequestException("Client is required");
    if (!user) throw new BadRequestException("User is required");

    const userEntity: User = await this.userRepository.findUserById(user);
    const clientEntity: Client =
      await this.clientRepository.findClientById(client);

    return this.orderRepository.createOrder(
      createOrderDto,
      userEntity,
      clientEntity,
    );
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.findAllOrders();
  }

  async findOne(id: string): Promise<Order> {
    if (!id) throw new BadRequestException("Id is required");
    return await this.orderRepository.findOrderById(id);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    if (!id) throw new BadRequestException("Id is required");
    return await this.orderRepository.updatedOrder(id, updateOrderDto);
  }

  async remove(id: string): Promise<Order> {
    if (!id) throw new BadRequestException("Id is required");
    return await this.orderRepository.deleteOrder(id);
  }
}
