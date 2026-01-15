import { InjectRepository } from "@nestjs/typeorm";
import { Invoice } from "../entities/invoice.entity";
import { Repository } from "typeorm";
import { UpdateInvoiceDto } from "../dto/update-invoice.dto";
import { CreateInvoiceDto } from "../dto/create-invoice.dto";
import { ConflictException, NotFoundException } from "@nestjs/common";
import { OrdersRepository } from "src/modules/orders/repositories/orders.repository";

export class InvoicesRepository {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    private readonly orderRepository: OrdersRepository,
  ) {}

  async createInvoice(createInvoiceDto: CreateInvoiceDto, orderId: string) {
    const order = await this.orderRepository.findOrderById(orderId);

    const invoiceExists = await this.invoiceRepository.findOneBy({
      order: { id: orderId },
    });
    if (invoiceExists) throw new ConflictException("Invoice already exists");

    const invoice = this.invoiceRepository.create({
      ...createInvoiceDto,
      order: order,
    });

    return await this.invoiceRepository.save(invoice);
  }

  async findAllInvoices() {
    const invoices = await this.invoiceRepository.find();
    if (!invoices || invoices.length === 0)
      throw new NotFoundException("Invoices not found");

    return invoices;
  }

  async findInvoiceById(id: string) {
    const invoice = await this.invoiceRepository.findOneBy({ id });
    if (!invoice) throw new NotFoundException("Invoice not found");

    return invoice;
  }

  async updatedInvoice(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    const invoicePreloaded = await this.invoiceRepository.preload({
      id,
      ...updateInvoiceDto,
    });

    if (!invoicePreloaded) throw new NotFoundException("Invoice not found");

    return await this.invoiceRepository.save(invoicePreloaded);
  }

  async deleteInvoice(id: string) {
    const invoice = await this.invoiceRepository.findOneBy({ id });
    if (!invoice) throw new NotFoundException("Invoice not found");

    await this.invoiceRepository.delete({ id });

    return invoice;
  }
}
