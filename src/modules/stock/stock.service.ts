import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateStockDto } from "./dto/create-stock.dto";
import { UpdateStockDto } from "./dto/update-stock.dto";
import { StockRepository } from "./repositories/stock.repository";
import { ProductsRepository } from "../products/repositories/products.repository";

@Injectable()
export class StockService {
  constructor(
    private readonly repository: StockRepository,
    private readonly productRepository: ProductsRepository,
  ) {}

  async create(createStockDto: CreateStockDto, productId: string) {
    if (!productId) throw new BadRequestException("productId is required");
    if (!createStockDto) throw new BadRequestException("Invalid stock data");

    const product = await this.productRepository.findProductById(productId);

    return await this.repository.createStock(createStockDto, product);
  }

  async findAll() {
    return this.repository.findAllStocks();
  }

  async findOne(id: string) {
    if (!id) throw new BadRequestException("Id is required");
    return this.repository.findStockById(id);
  }

  async update(id: string, updateStockDto: UpdateStockDto) {
    if (!id) throw new BadRequestException("Id is required");
    if (!updateStockDto) throw new BadRequestException("Invalid stock data");

    return this.repository.updatedStock(id, updateStockDto);
  }

  async remove(id: string) {
    if (!id) throw new BadRequestException("Id is required");
    return this.repository.deleteStock(id);
  }
}
