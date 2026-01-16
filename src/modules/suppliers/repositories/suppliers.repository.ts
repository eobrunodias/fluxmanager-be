import { Repository } from "typeorm";
import { Supplier } from "../entities/supplier.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateSupplierDto } from "../dto/create-supplier.dto";
import { UpdateSupplierDto } from "../dto/update-supplier.dto";
import { ConflictException, NotFoundException } from "@nestjs/common";
import { ProductsRepository } from "src/modules/products/repositories/products.repository";

export class SuppliersRepository {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
    private readonly productRepository: ProductsRepository,
  ) {}

  async createSupplier(
    createSupplierDto: CreateSupplierDto,
    productId: string,
  ) {
    const produto = await this.productRepository.findProductById(productId);

    const supplierExists = await this.supplierRepository.findOneBy({
      products: {
        id: productId,
      },
    });

    if (supplierExists) throw new ConflictException("Supplier already exists");

    const supplierCreated = this.supplierRepository.create({
      ...createSupplierDto,
      products: [produto],
    });

    return await this.supplierRepository.save(supplierCreated);
  }

  async findAllSuppliers() {
    const suppliers = await this.supplierRepository.find();
    if (!suppliers || suppliers.length === 0)
      throw new NotFoundException("No suppliers found");

    return suppliers;
  }

  async findSupplierById(id: string) {
    const supplier = await this.supplierRepository.findOneBy({ id });
    if (!supplier) throw new NotFoundException("Supplier not founds");

    return supplier;
  }

  async findSuppliersByIds(ids: string[]) {
    const suppliers = await this.supplierRepository.findByIds(ids);
    if (!suppliers || suppliers.length === 0)
      throw new NotFoundException("Suppliers not founds");

    return suppliers;
  }

  async updatedSupplier(id: string, updateSupplierDto: UpdateSupplierDto) {
    const supplierPreloaded = await this.supplierRepository.preload({
      id,
      ...updateSupplierDto,
    });

    if (!supplierPreloaded) throw new NotFoundException("Supplier not found");

    return await this.supplierRepository.save(supplierPreloaded);
  }

  async deleteSupplier(id: string) {
    const supplier = await this.supplierRepository.findOneBy({ id });
    if (!supplier) throw new NotFoundException("Supplier not found");

    await this.supplierRepository.delete(id);

    return supplier;
  }
}
