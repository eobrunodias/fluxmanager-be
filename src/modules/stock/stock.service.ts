import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateStockDto } from "./dto/create-stock.dto";
import { UpdateStockDto } from "./dto/update-stock.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Stock } from "./entities/stock.entity";
import { Repository } from "typeorm";
import { Product } from "../products/entities/product.entity";

@Injectable()
export class StockService {
  constructor(
    @InjectRepository(Stock)
    private readonly stockRepository: Repository<Stock>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(createStockDto: CreateStockDto, productId: string) {
    if (!productId) throw new BadRequestException("productId is required");
    if (!createStockDto) throw new BadRequestException("Invalid data stock");

    const product = await this.productRepository.findOneBy({ id: productId });
    if (!product) throw new NotFoundException("Product not found");

    if (product.id === productId)
      throw new ConflictException("Product alread exists");

    const stock = {
      ...createStockDto,
      product,
    };

    const stockCreated = this.stockRepository.create(stock);
    if (!stockCreated) throw new ConflictException("Stock not created");

    const stockSaved = await this.stockRepository.save(stockCreated);
    if (!stockSaved) throw new ConflictException("Stock not saved");

    return stockSaved;
  }

  async findAll() {
    const stocks = await this.stockRepository.find();
    if (!stocks) throw new ConflictException("Stocks not found");

    return stocks;
  }

  async findOne(id: string) {
    if (!id) throw new BadRequestException("Id is required");

    const stock = await this.stockRepository.findOneBy({ id });
    if (!stock) throw new ConflictException("Stock not found");

    return stock;
  }

  async update(id: string, updateStockDto: UpdateStockDto) {
    if (!id) throw new BadRequestException("Id is required");
    if (!updateStockDto) throw new BadRequestException("Invalid stock data");

    const stock = await this.stockRepository.findOneBy({ id });
    if (!stock) throw new NotFoundException("Stock not found");

    const stockUpdated = {
      ...updateStockDto,
      ...stock,
    };

    const stockPreloaded = await this.stockRepository.preload(stockUpdated);
    if (!stockPreloaded) throw new ConflictException("Stock not preloaded");

    const stockSaved = await this.stockRepository.save(stockPreloaded);
    if (!stockPreloaded) throw new ConflictException("Stock not saved");

    return stockSaved;
  }

  async remove(id: string) {
    if (!id) throw new BadRequestException("Id is required");

    const stock = await this.stockRepository.findOneBy({ id });
    if (!stock) throw new NotFoundException("Stock not found");

    const stockRemoved = await this.stockRepository.delete({ id });
    if (!stockRemoved) throw new ConflictException("Stock not removed");

    return stock;
  }
}
