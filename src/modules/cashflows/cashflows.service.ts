import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateCashflowsDto } from "./dto/create-cashflows.dto";
import { UpdateCashflowsDto } from "./dto/update-cashflows.dto";
import { CashflowsRepository } from "./repositories/cashflows.repository";

@Injectable()
export class CashflowsService {
  constructor(private readonly cashflowRepository: CashflowsRepository) {}

  async create(createCashflowsDto: CreateCashflowsDto, orderId: string) {
    if (!createCashflowsDto)
      throw new BadRequestException("Data cashflow is required");
    if (!orderId) throw new BadRequestException("orderId is required");

    return this.cashflowRepository.createCashflow(createCashflowsDto, orderId);
  }

  async findAll() {
    return this.cashflowRepository.findAllCashflows();
  }

  async findOne(id: string) {
    if (!id) throw new BadRequestException("Id is required");
    return this.cashflowRepository.findCashflowById(id);
  }

  async update(id: string, updateCashflowsDto: UpdateCashflowsDto) {
    if (!id) throw new BadRequestException("Id is required");
    if (!updateCashflowsDto)
      throw new BadRequestException("Data cashflow is required");

    return this.cashflowRepository.updatedCashflow(id, updateCashflowsDto);
  }

  async remove(id: string) {
    if (!id) throw new BadRequestException("Id is required");
    return this.cashflowRepository.deleteCashflow(id);
  }
}
