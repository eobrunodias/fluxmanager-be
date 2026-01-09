import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "../entities/product.entity";
import { ConflictException } from "@nestjs/common";

export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly repository: Repository<Product>,
  ) {}

  async createProduct() {}

  async findAllProducts() {}

  async findProductById(id: string) {
    const product = await this.repository.findOneBy({ id });
    if (!product) throw new ConflictException("Product not found");

    return product;
  }

  async updatedProduct() {}

  async deleteProduct() {}
}
