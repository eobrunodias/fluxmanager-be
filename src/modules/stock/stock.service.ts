import { Injectable } from "@nestjs/common";
import { CreateStockDto } from "./dto/create-stock.dto";
import { UpdateStockDto } from "./dto/update-stock.dto";

@Injectable()
export class StockService {
  create(createStockDto: CreateStockDto) {
    return "This action adds a new stock";
  }

  findAll() {
    return `This action returns all stock`;
  }

  findOne(id: string) {
    return `This action returns a #${id} stock`;
  }

  update(id: string, updateStockDto: UpdateStockDto) {
    return `This action updates a #${id} stock`;
  }

  remove(id: string) {
    return `This action removes a #${id} stock`;
  }
}
