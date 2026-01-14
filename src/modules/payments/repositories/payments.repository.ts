import { InjectRepository } from "@nestjs/typeorm";
import { Payment } from "../entities/payment.entity";
import { Repository } from "typeorm";
import { ConflictException, NotFoundException } from "@nestjs/common";
import { UpdatePaymentDto } from "../dto/update-payment.dto";
import { CreatePaymentDto } from "../dto/create-payment.dto";
import { OrdersRepository } from "src/modules/orders/repositories/orders.repository";

export class PaymentsRepository {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
    private readonly orderRepository: OrdersRepository,
  ) {}

  async createPayment(createPaymentDto: CreatePaymentDto, orderId: string) {
    const order = await this.orderRepository.findOrderById(orderId);

    const paymentExists = await this.paymentRepository.findOne({
      where: { order: { id: orderId } },
    });

    if (paymentExists) {
      throw new ConflictException("Payment already exists for this order");
    }

    const paymentCreated = this.paymentRepository.create({
      ...createPaymentDto,
      order: order,
    });

    return await this.paymentRepository.save(paymentCreated);
  }

  async findAllPayments() {
    const payments = await this.paymentRepository.find();
    if (!payments || payments.length === 0)
      throw new NotFoundException("Payments not found");

    return payments;
  }

  async findPaymentById(id: string) {
    const payment = await this.paymentRepository.findOneBy({ id });
    if (!payment) throw new NotFoundException("Payment not found");

    return payment;
  }

  async updatedPayment(id: string, updatePaymentDto: UpdatePaymentDto) {
    const paymentUpdated = await this.paymentRepository.preload({
      id,
      ...updatePaymentDto,
    });

    if (!paymentUpdated) throw new NotFoundException("Payment not found");

    return paymentUpdated;
  }

  async deletePayment(id: string) {
    const payment = await this.paymentRepository.findOneBy({ id });
    if (!payment) throw new NotFoundException("Payment not found");

    await this.paymentRepository.delete(id);

    return payment;
  }
}
