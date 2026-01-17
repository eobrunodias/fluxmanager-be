import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "../entities/product.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { UpdateProductDto } from "../dto/update-product.dto";
import { CreateProductDto } from "../dto/create-product.dto";
import { Supplier } from "src/modules/suppliers/entities/supplier.entity";
import { Category } from "src/modules/categories/entities/category.entity";

@Injectable()
export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
    suppliers: Supplier[],
    category: Category,
  ): Promise<Product> {
    const productExists: Product | null =
      await this.productRepository.findOneBy({
        sku: createProductDto.sku,
      });

    if (productExists)
      throw new NotFoundException("Product with this SKU already exists");

    const productCreated: Product = this.productRepository.create({
      ...createProductDto,
      category: category,
      suppliers: suppliers,
    });

    return await this.productRepository.save(productCreated);
  }

  async findAllProducts(): Promise<Product[]> {
    const products: Product[] = await this.productRepository.find();
    if (!products) throw new NotFoundException("Products not found");
    return products;
  }

  async findProductById(id: string): Promise<Product> {
    const product: Product | null = await this.productRepository.findOneBy({
      id,
    });
    if (!product) throw new NotFoundException("Product not found");

    return product;
  }

  async updatedProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const productPrealoaded: Product | undefined =
      await this.productRepository.preload({
        id,
        ...updateProductDto,
      });

    if (!productPrealoaded) throw new NotFoundException("Product not found");

    return await this.productRepository.save(productPrealoaded);
  }

  async deleteProduct(id: string): Promise<Product> {
    const product: Product | null = await this.productRepository.findOneBy({
      id,
    });
    if (!product) throw new NotFoundException("Product not found");

    await this.productRepository.remove(product);
    return product;
  }
}
