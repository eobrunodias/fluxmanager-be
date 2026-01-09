import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { Repository } from "typeorm";
import { Category } from "../categories/entities/category.entity";
import { Supplier } from "../suppliers/entities/supplier.entity";
import { ProductsRepository } from "./repositories/products.repository";

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: ProductsRepository,

    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createProductDto: CreateProductDto) {
    const existingBarcode = await this.productRepository.findOneBy({
      barcode: createProductDto.barcode,
    });
    if (existingBarcode)
      throw new BadRequestException("Barcode already exists");

    const existingSku = await this.productRepository.findOneBy({
      sku: createProductDto.sku,
    });
    if (existingSku) throw new BadRequestException("SKU already exists");

    const category = await this.categoryRepository.findOne({
      where: { id: createProductDto.categoryId },
    });
    if (!category) throw new NotFoundException("Category not found");

    const supplier = await this.supplierRepository.findOne({});

    if (!supplier) throw new NotFoundException("Supplier not found");

    const product = {
      ...createProductDto,
      category,
      supplier,
    };

    const productCreated = this.productRepository.create(product);
    if (!productCreated) throw new ConflictException("Product not created");

    const productSaved = await this.productRepository.save(productCreated);
    if (!productSaved) throw new ConflictException("Product not saved");

    return productSaved;
  }

  async findAll() {
    const products = await this.productRepository.find();
    if (!products) throw new ConflictException("Products not found");

    return products;
  }

  async findOne(id: string) {
    if (!id) throw new BadRequestException("Id is required");

    return this.productRepository.findProductById(id);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    if (!id) throw new BadRequestException("Id is required");
    if (!updateProductDto) new BadRequestException("Data product is required");

    const product = await this.productRepository.findOneBy({ id });
    if (!product) throw new ConflictException("Product not found");

    const productUpdated = {
      ...product,
      ...updateProductDto,
    };

    const productPrealoaded =
      await this.productRepository.preload(productUpdated);
    if (!productPrealoaded)
      throw new ConflictException("Product not preloaded");

    const productSaved = await this.productRepository.save(productPrealoaded);
    if (!productSaved) throw new ConflictException("Product not saved");

    return product;
  }

  async remove(id: string) {
    if (!id) throw new BadRequestException("Id is required");

    const product = await this.productRepository.findOneBy({ id });
    if (!product) throw new ConflictException("Product not found");

    const productDeleted = await this.productRepository.delete({ id });
    if (!productDeleted) throw new ConflictException("Product not deleted");

    return product;
  }
}
