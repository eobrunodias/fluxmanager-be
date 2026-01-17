import { InjectRepository } from "@nestjs/typeorm";
import { Invoice } from "../entities/invoice.entity";
import { Repository } from "typeorm";
import { UpdateInvoiceDto } from "../dto/update-invoice.dto";
import { CreateInvoiceDto } from "../dto/create-invoice.dto";
import { ConflictException, NotFoundException } from "@nestjs/common";
import { Order } from "src/modules/orders/entities/order.entity";

export class InvoicesRepository {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
  ) {}

  async createInvoice(
    createInvoiceDto: CreateInvoiceDto,
    order: Order,
  ): Promise<Invoice> {
    const invoiceExists: Invoice | null =
      await this.invoiceRepository.findOneBy({
        order: { id: order.id },
      });
    if (invoiceExists) throw new ConflictException("Invoice already exists");

    const invoice = this.invoiceRepository.create({
      ...createInvoiceDto,
      order: order,
    });

    return await this.invoiceRepository.save(invoice);
  }

  async findAllInvoices(): Promise<Invoice[]> {
    const invoices: Invoice[] = await this.invoiceRepository.find();
    if (!invoices || invoices.length === 0)
      throw new NotFoundException("Invoices not found");

    return invoices;
  }

  async findInvoiceById(id: string): Promise<Invoice> {
    const invoice: Invoice | null = await this.invoiceRepository.findOneBy({
      id,
    });
    if (!invoice) throw new NotFoundException("Invoice not found");

    return invoice;
  }

  async updatedInvoice(
    id: string,
    updateInvoiceDto: UpdateInvoiceDto,
  ): Promise<Invoice> {
    const invoicePreloaded: Invoice | undefined =
      await this.invoiceRepository.preload({
        id,
        ...updateInvoiceDto,
      });

    if (!invoicePreloaded) throw new NotFoundException("Invoice not found");

    return await this.invoiceRepository.save(invoicePreloaded);
  }

  async deleteInvoice(id: string): Promise<Invoice> {
    const invoice: Invoice | null = await this.invoiceRepository.findOneBy({
      id,
    });
    if (!invoice) throw new NotFoundException("Invoice not found");

    await this.invoiceRepository.delete({ id });

    return invoice;
  }
}
