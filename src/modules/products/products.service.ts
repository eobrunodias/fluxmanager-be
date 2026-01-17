import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductsRepository } from "./repositories/products.repository";
import { CategoriesRepository } from "../categories/repositories/categories.repository";
import { SuppliersRepository } from "../suppliers/repositories/suppliers.repository";
import { Product } from "./entities/product.entity";
import { Category } from "../categories/entities/category.entity";
import { Supplier } from "../suppliers/entities/supplier.entity";

@Injectable()
export class ProductsService {
  constructor(
    private readonly productRepository: ProductsRepository,
    private readonly supplierRepository: SuppliersRepository,
    private readonly categoryRepository: CategoriesRepository,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    if (!createProductDto)
      throw new BadRequestException("Data product is required");

    const { supplierIds, categoryId } = createProductDto;

    const category: Category =
      await this.categoryRepository.findCategoryById(categoryId);
    const suppliers: Supplier[] =
      await this.supplierRepository.findSuppliersByIds(supplierIds);

    return this.productRepository.createProduct(
      createProductDto,
      suppliers,
      category,
    );
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.findAllProducts();
  }

  async findOne(id: string): Promise<Product> {
    if (!id) throw new BadRequestException("Id is required");
    return this.productRepository.findProductById(id);
  }

  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    if (!id) throw new BadRequestException("Id is required");
    if (!updateProductDto)
      throw new BadRequestException("Data product is required");
    return this.productRepository.updatedProduct(id, updateProductDto);
  }

  async remove(id: string): Promise<Product> {
    if (!id) throw new BadRequestException("Id is required");
    return this.productRepository.deleteProduct(id);
  }
}
