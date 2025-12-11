import {
  BadRequestException,
  ConflictException,
  Injectable,
} from "@nestjs/common";
import { CreateCashflowsDto } from "./dto/create-cashflows.dto";
import { UpdateCashflowsDto } from "./dto/update-cashflows.dto";
import { Repository } from "typeorm";
import { Cashflow } from "./entities/cashflow.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class CashflowsService {
  constructor(
    @InjectRepository(Cashflow)
    private readonly repository: Repository<Cashflow>,
  ) {}

  async create(createCashflowsDto: CreateCashflowsDto, orderId: string) {
    console.log("orderId: ", orderId);
    if (!createCashflowsDto)
      throw new BadRequestException("Invalid data cashflow");
    if (!orderId) throw new BadRequestException("Order ID is required");

    const cashflow = {
      ...createCashflowsDto,
      order: { id: orderId },
    };

    const cashflowCreated = this.repository.create(cashflow);
    if (!cashflowCreated) throw new ConflictException("Cashflow not created");

    const cashflowSaved = await this.repository.save(cashflowCreated);
    if (!cashflowSaved) throw new ConflictException("Cashflow not saved");

    return cashflowSaved;
  }

  async findAll() {
    const cashflows = await this.repository.find();
    if (!cashflows) throw new ConflictException("Cashflows not found");

    return cashflows;
  }

  findOne(id: string) {
    return `This action returns a #${id} cashflow`;
  }

  update(id: string, updateCashflowsDto: UpdateCashflowsDto) {
    return `This action updates a #${id} cashflow`;
  }

  remove(id: string) {
    return `This action removes a #${id} cashflow`;
  }
}
