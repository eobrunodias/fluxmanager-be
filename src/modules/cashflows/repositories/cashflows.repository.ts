import { Repository } from "typeorm";
import { Cashflow } from "../entities/cashflow.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { ConflictException, NotFoundException } from "@nestjs/common";
import { UpdateCashflowsDto } from "../dto/update-cashflows.dto";
import { CreateCashflowsDto } from "../dto/create-cashflows.dto";
import { Order } from "src/modules/orders/entities/order.entity";

export class CashflowsRepository {
  constructor(
    @InjectRepository(Cashflow)
    private readonly cashflowRepository: Repository<Cashflow>,
  ) {}

  async createCashflow(
    createCashflowsDto: CreateCashflowsDto,
    order: Order,
  ): Promise<Cashflow> {
    const cashflowExists: Cashflow | null =
      await this.cashflowRepository.findOne({
        where: { order: { id: order.id } },
      });

    if (cashflowExists) {
      throw new ConflictException("Cashflow already exists for this order");
    }

    const cashflowCreated = this.cashflowRepository.create({
      ...createCashflowsDto,
      order: order,
    });

    return await this.cashflowRepository.save(cashflowCreated);
  }

  async findAllCashflows(): Promise<Cashflow[]> {
    const cashflows: Cashflow[] = await this.cashflowRepository.find();
    if (!cashflows || cashflows.length === 0)
      throw new NotFoundException("Cashflows not found");
    return cashflows;
  }

  async findCashflowById(id: string): Promise<Cashflow> {
    const cashflow: Cashflow | null = await this.cashflowRepository.findOneBy({
      id,
    });
    if (!cashflow) throw new NotFoundException("Cashflow not found");
    return cashflow;
  }

  async updatedCashflow(
    id: string,
    updateCashflow: UpdateCashflowsDto,
  ): Promise<Cashflow> {
    const cashflowPreloaded: Cashflow | undefined =
      await this.cashflowRepository.preload({
        id,
        ...updateCashflow,
      });

    if (!cashflowPreloaded) throw new NotFoundException("Cashflow not found");
    return await this.cashflowRepository.save(cashflowPreloaded);
  }

  async deleteCashflow(id: string): Promise<Cashflow> {
    const cashflow: Cashflow | null = await this.cashflowRepository.findOneBy({
      id,
    });
    if (!cashflow) throw new NotFoundException("Cashflow not found");

    await this.cashflowRepository.delete({ id });

    return cashflow;
  }
}
