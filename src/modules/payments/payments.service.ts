import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Payment } from "./entities/payment.entity";
import { Repository } from "typeorm";

@Injectable()
export class PaymentsService {
  constructor(
    @InjectRepository(Payment)
    private readonly repository: Repository<Payment>,
  ) {}

  async create(createPaymentDto: CreatePaymentDto, orderId: string) {
    if (!orderId) throw new BadRequestException("orderId is required");
    if (!createPaymentDto)
      throw new BadRequestException("Data payment is required");

    const payment = {
      order: {
        id: orderId,
      },
      ...createPaymentDto,
    };

    const paymentCreated = this.repository.create(payment);
    if (!paymentCreated) throw new NotFoundException("Payment not created");

    const paymentSaved = await this.repository.save(paymentCreated);
    if (!paymentSaved) throw new NotFoundException("Payment not saved");

    return paymentSaved;
  }

  async findAll() {
    const payments = await this.repository.find();
    if (!payments) throw new NotFoundException("Payments not found");

    return payments;
  }

  async findOne(id: string) {
    if (!id) throw new BadRequestException("Id is required");

    const payment = await this.repository.findOneBy({ id });
    if (!payment) throw new NotFoundException("Payment not found");

    return payment;
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    if (!id) throw new BadRequestException("Id is required");
    if (!updatePaymentDto)
      throw new BadRequestException("Data payment is required");

    const payment = await this.repository.findOneBy({ id });
    if (!payment) throw new NotFoundException("Payment not found");

    const paymentUpdated = {
      ...payment,
      ...updatePaymentDto,
    };

    return paymentUpdated;
  }

  async remove(id: string) {
    if (!id) throw new BadRequestException("Id is required");

    const payment = await this.repository.findOneBy({ id });
    if (!payment) throw new NotFoundException("Payment not found");

    return payment;
  }
}
