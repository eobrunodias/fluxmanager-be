import { BadRequestException, Injectable } from "@nestjs/common";
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

  async create(createCashflowsDto: CreateCashflowsDto) {
    if (!createCashflowsDto)
      throw new BadRequestException("Cashflow not found");

    const newCashflow = this.repository.create(createCashflowsDto);

    if (!newCashflow) throw new BadRequestException("Cashflow not found");

    return await this.repository.save(newCashflow);
  }

  findAll() {
    return `This action returns all cashflow`;
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
