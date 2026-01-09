import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateStockDto } from "./dto/create-stock.dto";
import { UpdateStockDto } from "./dto/update-stock.dto";
import { StockRepository } from "./repositories/stock.repository";
import { ProductsRepository } from "../products/repositories/products.repository";

@Injectable()
export class StockService {
  constructor(
    private readonly stockRepository: StockRepository,
    private readonly productRepository: ProductsRepository,
  ) {}

  async create(createStockDto: CreateStockDto, productId: string) {
    if (!productId) throw new BadRequestException("productId is required");
    if (!createStockDto) throw new BadRequestException("Invalid data stock");

    const product = await this.productRepository.findProductById(productId);
    if (!product) throw new NotFoundException("Product not found");

    if (product.id === productId)
      throw new ConflictException("Product alread exists");

    return this.stockRepository.createStock(createStockDto);
  }

  async findAll() {
    return this.stockRepository.findAllStocks();
  }

  async findOne(id: string) {
    if (!id) throw new BadRequestException("Id is required");

    return this.stockRepository.findStockById(id);
  }

  async update(id: string, updateStockDto: UpdateStockDto) {
    if (!id) throw new BadRequestException("Id is required");
    if (!updateStockDto) throw new BadRequestException("Invalid stock data");

    return this.stockRepository.updatedStock(id, updateStockDto);
  }

  async remove(id: string) {
    if (!id) throw new BadRequestException("Id is required");

    return this.stockRepository.deleteStock(id);
  }
}
