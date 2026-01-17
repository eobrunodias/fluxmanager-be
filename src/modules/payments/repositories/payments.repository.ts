import { InjectRepository } from "@nestjs/typeorm";
import { Payment } from "../entities/payment.entity";
import { Repository } from "typeorm";
import { ConflictException, NotFoundException } from "@nestjs/common";
import { UpdatePaymentDto } from "../dto/update-payment.dto";
import { CreatePaymentDto } from "../dto/create-payment.dto";
import { Order } from "src/modules/orders/entities/order.entity";

export class PaymentsRepository {
  constructor(
    @InjectRepository(Payment)
    private readonly paymentRepository: Repository<Payment>,
  ) {}

  async createPayment(createPaymentDto: CreatePaymentDto, order: Order) {
    const paymentExists = await this.paymentRepository.findOne({
      where: { order: { id: order.id } },
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
