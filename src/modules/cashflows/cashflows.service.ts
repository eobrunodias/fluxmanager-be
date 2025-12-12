import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateCashflowsDto } from "./dto/create-cashflows.dto";
import { UpdateCashflowsDto } from "./dto/update-cashflows.dto";
import { Repository } from "typeorm";
import { Cashflow } from "./entities/cashflow.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Order } from "../orders/entities/order.entity";

@Injectable()
export class CashflowsService {
  constructor(
    @InjectRepository(Cashflow)
    private readonly cashflowRepository: Repository<Cashflow>,
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) {}

  async create(createCashflowsDto: CreateCashflowsDto) {
    if (!createCashflowsDto)
      throw new BadRequestException("Invalid data cashflow");

    const { orderId, ...dto } = createCashflowsDto;

    const order = await this.orderRepository.findOneBy({ id: orderId });
    if (!order) throw new NotFoundException("Order not found");

    const cashflow = {
      ...dto,
      order,
    };

    const cashflowCreated = this.cashflowRepository.create(cashflow);
    if (!cashflowCreated) throw new ConflictException("Cashflow not created");

    const cashflowSaved = await this.cashflowRepository.save(cashflowCreated);
    if (!cashflowSaved) throw new ConflictException("Cashflow not saved");

    return cashflowSaved;
  }

  async findAll() {
    const cashflows = await this.cashflowRepository.find();
    if (!cashflows || cashflows.length === 0)
      throw new NotFoundException("Cashflows not found");

    return cashflows;
  }

  async findOne(id: string) {
    if (!id) throw new BadRequestException("Id is required");

    const cashflow = await this.cashflowRepository.findOneBy({ id });
    if (!cashflow) throw new NotFoundException("Cashflow not found");

    return cashflow;
  }

  async update(id: string, updateCashflowsDto: UpdateCashflowsDto) {
    if (!id) throw new BadRequestException("Id is required");
    if (!updateCashflowsDto)
      throw new BadRequestException("Data cashflow is required");

    const cashflow = await this.cashflowRepository.findOneBy({ id });
    if (!cashflow) throw new NotFoundException("Cashflow not found");

    const cashflowUpdated = {
      ...cashflow,
      ...updateCashflowsDto,
    };

    const cashflowPreloaded =
      await this.cashflowRepository.preload(cashflowUpdated);
    if (!cashflowPreloaded)
      throw new ConflictException("Cashflow not preloaded");

    const cashflowSaved = await this.cashflowRepository.save(cashflowPreloaded);
    if (!cashflowSaved) throw new ConflictException("Cashflow not saved");

    return cashflowSaved;
  }

  async remove(id: string) {
    if (!id) throw new BadRequestException("Id is required");

    const cashflow = await this.cashflowRepository.findOneBy({ id });
    if (!cashflow) throw new NotFoundException("Cashflow not found");

    const cashflowDeleted = await this.cashflowRepository.delete({ id });
    if (!cashflowDeleted) throw new ConflictException("Cashflow not deleted");

    return cashflow;
  }
}
