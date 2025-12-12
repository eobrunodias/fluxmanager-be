import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateOrderItemDto } from "./dto/create-order-item.dto";
import { UpdateOrderItemDto } from "./dto/update-order-item.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { OrderItem } from "./entities/order-item.entity";
import { Repository } from "typeorm";
import { Product } from "../products/entities/product.entity";
import { Order } from "../orders/entities/order.entity";

@Injectable()
export class OrderItemsService {
  constructor(
    @InjectRepository(OrderItem)
    private readonly orderItemsRepository: Repository<OrderItem>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto) {
    if (!createOrderItemDto)
      throw new BadRequestException("Data ordemItem is required");

    const { productId, orderId, ...dto } = createOrderItemDto;

    const product = await this.productRepository.findOneBy({ id: productId });
    if (!product) throw new NotFoundException("Product not found");

    const order = await this.orderRepository.findOneBy({ id: orderId });
    if (!order) throw new NotFoundException("Order not found");

    const ordemItem = {
      ...dto,
      product,
      order,
    };

    const orderItemCreated = this.orderItemsRepository.create(ordemItem);
    if (!orderItemCreated) throw new ConflictException("OrderItem not created");

    const orderItemSaved =
      await this.orderItemsRepository.save(orderItemCreated);
    if (!orderItemSaved) throw new ConflictException("OrderItem not saved");

    return orderItemSaved;
  }

  async findAll() {
    const orderItems = await this.orderItemsRepository.find();
    if (!orderItems || orderItems.length === 0)
      throw new NotFoundException("OrderItems not found");

    return orderItems;
  }

  async findOne(id: string) {
    if (!id) throw new BadRequestException("Id is required");

    const orderItem = await this.orderItemsRepository.findOneBy({ id });
    if (!orderItem) throw new NotFoundException("OrderItem not found");

    return orderItem;
  }

  async update(id: string, updateOrderItemDto: UpdateOrderItemDto) {
    if (!id) throw new BadRequestException("Id is required");
    if (!updateOrderItemDto)
      throw new BadRequestException("Data orderItem is required");

    const orderItem = await this.orderItemsRepository.findOneBy({ id });
    if (!orderItem) throw new NotFoundException("OrderItem not found");

    const orderItemUpdated = {
      ...updateOrderItemDto,
      ...orderItem,
    };

    const orderItemPreloaded =
      await this.orderItemsRepository.preload(orderItemUpdated);
    if (!orderItemPreloaded)
      throw new ConflictException("orderItem not preloaded");

    const orderItemSaved =
      await this.orderItemsRepository.preload(orderItemPreloaded);
    if (!orderItemSaved) throw new ConflictException("orderItem not saved");

    return orderItemSaved;
  }

  async remove(id: string) {
    if (!id) throw new BadRequestException("Id is required");

    const orderItem = await this.orderItemsRepository.findOneBy({ id });
    if (!orderItem) throw new NotFoundException("OrderItem not found");

    const orderItemDeleted = await this.orderItemsRepository.delete({ id });
    if (!orderItemDeleted) throw new ConflictException("OrderItem not deleted");

    return orderItem;
  }
}
