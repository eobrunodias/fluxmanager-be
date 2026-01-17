import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateStockDto } from "./dto/create-stock.dto";
import { UpdateStockDto } from "./dto/update-stock.dto";
import { StockRepository } from "./repositories/stock.repository";
import { ProductsRepository } from "../products/repositories/products.repository";
import { Stock } from "./entities/stock.entity";
import { Product } from "../products/entities/product.entity";

@Injectable()
export class StockService {
  constructor(
    private readonly repository: StockRepository,
    private readonly productRepository: ProductsRepository,
  ) {}

  async create(
    createStockDto: CreateStockDto,
    productId: string,
  ): Promise<Stock> {
    if (!productId) throw new BadRequestException("productId is required");
    if (!createStockDto) throw new BadRequestException("Invalid stock data");

    const product: Product =
      await this.productRepository.findProductById(productId);

    return await this.repository.createStock(createStockDto, product);
  }

  async findAll(): Promise<Stock[]> {
    return this.repository.findAllStocks();
  }

  async findOne(id: string): Promise<Stock> {
    if (!id) throw new BadRequestException("Id is required");
    return this.repository.findStockById(id);
  }

  async update(id: string, updateStockDto: UpdateStockDto): Promise<Stock> {
    if (!id) throw new BadRequestException("Id is required");
    if (!updateStockDto) throw new BadRequestException("Invalid stock data");

    return this.repository.updatedStock(id, updateStockDto);
  }

  async remove(id: string): Promise<Stock> {
    if (!id) throw new BadRequestException("Id is required");
    return this.repository.deleteStock(id);
  }
}
