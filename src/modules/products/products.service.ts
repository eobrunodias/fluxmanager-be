import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductsRepository } from "./repositories/products.repository";

@Injectable()
export class ProductsService {
  constructor(private readonly repository: ProductsRepository) {}

  async create(
    createProductDto: CreateProductDto,
    supplierId: string,
    categoryId: string,
  ) {
    return this.repository.createProduct(
      createProductDto,
      supplierId,
      categoryId,
    );
  }

  async findAll() {
    return this.repository.findAllProducts();
  }

  async findOne(id: string) {
    if (!id) throw new BadRequestException("Id is required");
    return this.repository.findProductById(id);
  }

  async update(id: string, updateProductDto: UpdateProductDto) {
    if (!id) throw new BadRequestException("Id is required");
    if (!updateProductDto)
      throw new BadRequestException("Data product is required");
    return this.repository.updatedProduct(id, updateProductDto);
  }

  async remove(id: string) {
    if (!id) throw new BadRequestException("Id is required");
    return this.repository.deleteProduct(id);
  }
}
