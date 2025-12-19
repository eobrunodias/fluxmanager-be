import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateInvoiceDto } from "./dto/create-invoice.dto";
import { UpdateInvoiceDto } from "./dto/update-invoice.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Invoice } from "./entities/invoice.entity";
import { Repository } from "typeorm";
import { Order } from "../orders/entities/order.entity";

@Injectable()
export class InvoicesService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(createInvoiceDto: CreateInvoiceDto, orderId: string) {
    if (!createInvoiceDto)
      throw new BadRequestException("Data invoice is required");
    if (!orderId) throw new BadRequestException("orderId is required");

    const order = await this.orderRepository.findOneBy({ id: orderId });
    if (!order) throw new NotFoundException("Order not found");

    const invoice = {
      ...createInvoiceDto,
      orderId: orderId,
      // order,
    };

    const invoiceCreated = this.invoiceRepository.create(invoice);
    if (!invoiceCreated) throw new ConflictException("Invoice not created");

    const invoiceSaved = await this.invoiceRepository.save(invoiceCreated);
    if (!invoiceSaved) throw new ConflictException("Invoice not saved");

    console.log(createInvoiceDto, invoiceCreated, invoiceSaved);

    return invoiceSaved;
  }

  async findAll() {
    const invoices = await this.invoiceRepository.find();
    if (!invoices || invoices.length === 0)
      throw new NotFoundException("Invoices not found");

    return invoices;
  }

  async findOne(id: string) {
    if (!id) throw new BadRequestException("Id is required");

    const invoice = await this.invoiceRepository.findOneBy({ id });
    if (!invoice) throw new NotFoundException("Invoice not found");

    return invoice;
  }

  async update(id: string, updateInvoiceDto: UpdateInvoiceDto) {
    if (!id) throw new BadRequestException("Id is required");
    if (!updateInvoiceDto) throw new BadRequestException("Id is required");

    const invoice = await this.invoiceRepository.findOneBy({ id });
    if (!invoice) throw new NotFoundException("Invoice not found");

    const invoiceUpdated = {
      ...invoice,
      ...updateInvoiceDto,
    };

    const invoicePreloaded =
      await this.invoiceRepository.preload(invoiceUpdated);
    if (!invoicePreloaded) throw new ConflictException("Invoice not preloaded");

    const invoiceSaved = await this.invoiceRepository.save(invoicePreloaded);
    if (!invoiceSaved) throw new ConflictException("Invoice not saved");

    return invoiceSaved;
  }

  async remove(id: string) {
    if (!id) throw new BadRequestException("Id is required");

    const invoice = await this.invoiceRepository.findOneBy({ id });
    if (!invoice) throw new NotFoundException("Invoice not found");

    const invoiceDeleted = await this.invoiceRepository.delete({ id });
    if (!invoiceDeleted) throw new ConflictException("Invoice not deleted");

    return invoice;
  }
}
