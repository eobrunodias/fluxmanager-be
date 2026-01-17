import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateInvoiceDto } from "./dto/create-invoice.dto";
import { UpdateInvoiceDto } from "./dto/update-invoice.dto";
import { InvoicesRepository } from "./repositories/invoices.repository";
import { OrdersRepository } from "../orders/repositories/orders.repository";
import { Invoice } from "./entities/invoice.entity";
import { Order } from "../orders/entities/order.entity";

@Injectable()
export class InvoicesService {
  constructor(
    private readonly invoiceRepository: InvoicesRepository,
    private readonly orderRepository: OrdersRepository,
  ) {}

  async create(
    createInvoiceDto: CreateInvoiceDto,
    orderId: string,
  ): Promise<Invoice> {
    if (!createInvoiceDto)
      throw new BadRequestException("Data invoice is required");
    if (!orderId) throw new BadRequestException("orderId is required");

    const order: Order = await this.orderRepository.findOrderById(orderId);

    return this.invoiceRepository.createInvoice(createInvoiceDto, order);
  }

  async findAll(): Promise<Invoice[]> {
    return this.invoiceRepository.findAllInvoices();
  }

  async findOne(id: string): Promise<Invoice> {
    if (!id) throw new BadRequestException("Id is required");
    return this.invoiceRepository.findInvoiceById(id);
  }

  async update(
    id: string,
    updateInvoiceDto: UpdateInvoiceDto,
  ): Promise<Invoice> {
    if (!id) throw new BadRequestException("Id is required");
    if (!updateInvoiceDto) throw new BadRequestException("Id is required");
    return this.invoiceRepository.updatedInvoice(id, updateInvoiceDto);
  }

  async remove(id: string): Promise<Invoice> {
    if (!id) throw new BadRequestException("Id is required");
    return this.invoiceRepository.deleteInvoice(id);
  }
}
