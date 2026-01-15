import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Product } from "../entities/product.entity";
import { NotFoundException } from "@nestjs/common";
import { UpdateProductDto } from "../dto/update-product.dto";
import { CreateProductDto } from "../dto/create-product.dto";
import { SuppliersRepository } from "src/modules/suppliers/repositories/suppliers.repository";
import { CategoriesRepository } from "src/modules/categories/repositories/categories.repository";

export class ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly supplierRepository: SuppliersRepository,
    private readonly categoryRepository: CategoriesRepository,
  ) {}

  async createProduct(
    createProductDto: CreateProductDto,
    supplierId: string,
    categoryId: string,
  ) {
    const category = await this.categoryRepository.findCategoryById(categoryId);
    const supplier = await this.supplierRepository.findSupplierById(supplierId);

    const productExists = await this.productRepository.findOneBy({
      sku: createProductDto.sku,
    });

    if (productExists)
      throw new NotFoundException("Product with this SKU already exists");

    const productCreated = this.productRepository.create({
      ...createProductDto,
      category: category,
      suppliers: [supplier],
    });

    return await this.productRepository.save(productCreated);
  }

  async findAllProducts() {
    const products = await this.productRepository.find();
    if (!products) throw new NotFoundException("Products not found");
    return products;
  }

  async findProductById(id: string) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) throw new NotFoundException("Product not found");

    return product;
  }

  async updatedProduct(id: string, updateProductDto: UpdateProductDto) {
    const productPrealoaded = await this.productRepository.preload({
      id,
      ...updateProductDto,
    });

    if (!productPrealoaded) throw new NotFoundException("Product not found");

    return await this.productRepository.save(productPrealoaded);
  }

  async deleteProduct(id: string) {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) throw new NotFoundException("Product not found");
    return product;
  }
}
