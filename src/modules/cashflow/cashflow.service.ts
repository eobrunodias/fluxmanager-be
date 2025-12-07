import { Injectable } from "@nestjs/common";
import { CreateCashflowDto } from "./dto/create-cashflow.dto";
import { UpdateCashflowDto } from "./dto/update-cashflow.dto";

@Injectable()
export class CashflowService {
  create(createCashflowDto: CreateCashflowDto) {
    return "This action adds a new cashflow";
  }

  findAll() {
    return `This action returns all cashflow`;
  }

  findOne(id: string) {
    return `This action returns a #${id} cashflow`;
  }

  update(id: string, updateCashflowDto: UpdateCashflowDto) {
    return `This action updates a #${id} cashflow`;
  }

  remove(id: string) {
    return `This action removes a #${id} cashflow`;
  }
}
