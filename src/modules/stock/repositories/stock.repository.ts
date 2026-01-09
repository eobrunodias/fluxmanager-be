import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Stock } from "../entities/stock.entity";
import { ConflictException, NotFoundException } from "@nestjs/common";
import { UpdateStockDto } from "../dto/update-stock.dto";
import { CreateStockDto } from "../dto/create-stock.dto";

export class StockRepository {
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
  ) {}

  async createStock(createStockDto: CreateStockDto) {
    const stock = {
      ...createStockDto,
    };

    const stockCreated = this.stockRepository.create(stock);
    if (!stockCreated) throw new ConflictException("Stock not created");

    const stockSaved = await this.stockRepository.save(stockCreated);
    if (!stockSaved) throw new ConflictException("Stock not saved");

    return stockSaved;
  }

  async findAllStocks() {
    const stocks = await this.stockRepository.find();

    if (!stocks) throw new NotFoundException();

    return stocks;
  }

  async findStockById(id: string) {
    const stock = await this.stockRepository.findOneBy({ id });
    if (!stock) throw new ConflictException("Stock not found");

    return stock;
  }

  async updatedStock(id: string, updateStockDto: UpdateStockDto) {
    const stock = await this.stockRepository.findOneBy({ id });
    if (!stock) throw new NotFoundException("Stock not found");

    const stockUpdated = {
      ...stock,
      ...updateStockDto,
    };

    const stockPreloaded = await this.stockRepository.preload(stockUpdated);
    if (!stockPreloaded) throw new ConflictException("Stock not preloaded");

    const stockSaved = await this.stockRepository.save(stockPreloaded);
    if (!stockPreloaded) throw new ConflictException("Stock not saved");

    return stockSaved;
  }

  async deleteStock(id: string) {
    const stock = await this.stockRepository.findOneBy({ id });
    if (!stock) throw new NotFoundException("Stock not found");

    const stockRemoved = await this.stockRepository.delete({ id });
    if (!stockRemoved) throw new ConflictException("Stock not removed");

    return stock;
  }
}
