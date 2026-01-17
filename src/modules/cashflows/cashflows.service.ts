import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCashflowsDto } from "./dto/create-cashflows.dto";
import { UpdateCashflowsDto } from "./dto/update-cashflows.dto";
import { CashflowsRepository } from "./repositories/cashflows.repository";
import { OrdersRepository } from "../orders/repositories/orders.repository";
import { Cashflow } from "./entities/cashflow.entity";
import { Order } from "../orders/entities/order.entity";

@Injectable()
export class CashflowsService {
  constructor(
    private readonly cashflowRepository: CashflowsRepository,
    private readonly orderRepository: OrdersRepository,
  ) {}

  async create(
    createCashflowsDto: CreateCashflowsDto,
    orderId: string,
  ): Promise<Cashflow> {
    if (!createCashflowsDto)
      throw new BadRequestException("Data cashflow is required");
    if (!orderId) throw new BadRequestException("orderId is required");

    const order: Order = await this.orderRepository.findOrderById(orderId);

    return this.cashflowRepository.createCashflow(createCashflowsDto, order);
  }

  async findAll(): Promise<Cashflow[]> {
    return this.cashflowRepository.findAllCashflows();
  }

  async findOne(id: string): Promise<Cashflow> {
    if (!id) throw new BadRequestException("Id is required");
    return this.cashflowRepository.findCashflowById(id);
  }

  async update(
    id: string,
    updateCashflowsDto: UpdateCashflowsDto,
  ): Promise<Cashflow> {
    if (!id) throw new BadRequestException("Id is required");
    if (!updateCashflowsDto)
      throw new BadRequestException("Data cashflow is required");

    return this.cashflowRepository.updatedCashflow(id, updateCashflowsDto);
  }

  async remove(id: string): Promise<Cashflow> {
    if (!id) throw new BadRequestException("Id is required");
    return this.cashflowRepository.deleteCashflow(id);
  }
}
