import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Stock } from "../entities/stock.entity";
import { ConflictException, NotFoundException } from "@nestjs/common";
import { UpdateStockDto } from "../dto/update-stock.dto";
import { CreateStockDto } from "../dto/create-stock.dto";
import { Product } from "src/modules/products/entities/product.entity";

export class StockRepository {
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
  ) {}

  async createStock(createStockDto: CreateStockDto, product: Product) {
    const existingStock = await this.stockRepository.findOneBy({
      product: { id: product.id },
    });
    if (existingStock)
      throw new ConflictException("Stock for this product already exists");

    const stock = this.stockRepository.create({
      ...createStockDto,
      product: product,
    });

    return await this.stockRepository.save(stock);
  }

  async findAllStocks() {
    const stocks = await this.stockRepository.find();
    if (!stocks || stocks.length === 0) throw new NotFoundException();

    return stocks;
  }

  async findStockById(id: string) {
    const stock = await this.stockRepository.findOneBy({ id });
    if (!stock) throw new ConflictException("Stock not found");

    return stock;
  }

  async updatedStock(id: string, updateStockDto: UpdateStockDto) {
    const stockPreloaded = await this.stockRepository.preload({
      id,
      ...updateStockDto,
    });

    if (!stockPreloaded) throw new NotFoundException("Stock not found");

    return await this.stockRepository.save(stockPreloaded);
  }

  async deleteStock(id: string) {
    const stock = await this.stockRepository.findOneBy({ id });
    if (!stock) throw new NotFoundException("Stock not found");

    await this.stockRepository.delete(id);

    return stock;
  }
}
