import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateSupplierDto } from "./dto/create-supplier.dto";
import { UpdateSupplierDto } from "./dto/update-supplier.dto";
import { SuppliersRepository } from "./repositories/suppliers.repository";
import { ProductsRepository } from "../products/repositories/products.repository";
import { Supplier } from "./entities/supplier.entity";
import { Product } from "../products/entities/product.entity";

@Injectable()
export class SuppliersService {
  constructor(
    private readonly supplierRepository: SuppliersRepository,
    private readonly productRepository: ProductsRepository,
  ) {}

  async create(
    createSupplierDto: CreateSupplierDto,
    productId: string,
  ): Promise<Supplier> {
    if (!createSupplierDto)
      throw new BadRequestException("Invalid supplier data");
    if (!productId) throw new BadRequestException("productId is invalid");

    const product: Product =
      await this.productRepository.findProductById(productId);

    return this.supplierRepository.createSupplier(createSupplierDto, product);
  }

  async findAll(): Promise<Supplier[]> {
    return this.supplierRepository.findAllSuppliers();
  }

  async findOne(id: string): Promise<Supplier> {
    if (!id) throw new BadRequestException("Id is required");
    return this.supplierRepository.findSupplierById(id);
  }

  async update(
    id: string,
    updateSupplierDto: UpdateSupplierDto,
  ): Promise<Supplier> {
    if (!id) throw new BadRequestException("Id is required");
    if (!updateSupplierDto)
      throw new BadRequestException("Body data supplier is required");

    return this.supplierRepository.updatedSupplier(id, updateSupplierDto);
  }

  async remove(id: string): Promise<Supplier> {
    if (!id) throw new BadRequestException("Id is required");
    return this.supplierRepository.findSupplierById(id);
  }
}
