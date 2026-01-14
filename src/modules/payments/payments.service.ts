import { BadRequestException, Injectable } from "@nestjs/common";
import { CreatePaymentDto } from "./dto/create-payment.dto";
import { UpdatePaymentDto } from "./dto/update-payment.dto";
import { PaymentsRepository } from "./repositories/payments.repository";

@Injectable()
export class PaymentsService {
  constructor(private readonly repository: PaymentsRepository) {}

  async create(createPaymentDto: CreatePaymentDto, orderId: string) {
    if (!orderId) throw new BadRequestException("orderId is required");
    if (!createPaymentDto)
      throw new BadRequestException("Data payment is required");

    return this.repository.createPayment(createPaymentDto, orderId);
  }

  async findAll() {
    return this.repository.findAllPayments();
  }

  async findOne(id: string) {
    if (!id) throw new BadRequestException("Id is required");
    return this.repository.findPaymentById(id);
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    if (!id) throw new BadRequestException("Id is required");
    if (!updatePaymentDto)
      throw new BadRequestException("Data payment is required");

    return this.repository.updatedPayment(id, updatePaymentDto);
  }

  async remove(id: string) {
    if (!id) throw new BadRequestException("Id is required");
    return this.repository.deletePayment(id);
  }
}
