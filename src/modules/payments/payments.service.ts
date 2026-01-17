import { BadRequestException, Injectable } from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { PaymentsRepository } from "./repositories/payments.repository";
import { OrdersRepository } from "../orders/repositories/orders.repository";
import { Payment } from "./entities/payment.entity";
import { Order } from "../orders/entities/order.entity";

@Injectable()
export class PaymentsService {
  constructor(
    private readonly repository: PaymentsRepository,
    private readonly orderRepository: OrdersRepository,
  ) {}

  async create(
    createPaymentDto: CreatePaymentDto,
    orderId: string,
  ): Promise<Payment> {
    if (!orderId) throw new BadRequestException("orderId is required");
    if (!createPaymentDto)
      throw new BadRequestException("Data payment is required");

    const order: Order = await this.orderRepository.findOrderById(orderId);

    return this.repository.createPayment(createPaymentDto, order);
  }

  async findAll(): Promise<Payment[]> {
    return this.repository.findAllPayments();
  }

  async findOne(id: string): Promise<Payment> {
    if (!id) throw new BadRequestException("Id is required");
    return this.repository.findPaymentById(id);
  }

  async update(
    id: string,
    updatePaymentDto: UpdatePaymentDto,
  ): Promise<Payment> {
    if (!id) throw new BadRequestException("Id is required");
    if (!updatePaymentDto)
      throw new BadRequestException("Data payment is required");

    return this.repository.updatedPayment(id, updatePaymentDto);
  }

  async remove(id: string): Promise<Payment> {
    if (!id) throw new BadRequestException("Id is required");
    return this.repository.deletePayment(id);
  }
}
