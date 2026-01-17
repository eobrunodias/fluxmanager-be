import { Repository } from "typeorm";
import { Supplier } from "../entities/supplier.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateSupplierDto } from "../dto/create-supplier.dto";
import { UpdateSupplierDto } from "../dto/update-supplier.dto";
import {
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Product } from "src/modules/products/entities/product.entity";

@Injectable()
export class SuppliersRepository {
  constructor(
    @InjectRepository(Supplier)
    private readonly supplierRepository: Repository<Supplier>,
  ) {}

  async createSupplier(
    createSupplierDto: CreateSupplierDto,
    product: Product,
  ): Promise<Supplier> {
    const supplierExists: Supplier | null =
      await this.supplierRepository.findOneBy({
        products: {
          id: product.id,
        },
      });

    if (supplierExists) throw new ConflictException("Supplier already exists");

    const supplierCreated: Supplier = this.supplierRepository.create({
      ...createSupplierDto,
      products: [product],
    });

    return await this.supplierRepository.save(supplierCreated);
  }

  async findAllSuppliers(): Promise<Supplier[]> {
    const suppliers: Supplier[] = await this.supplierRepository.find();
    if (!suppliers || suppliers.length === 0)
      throw new NotFoundException("No suppliers found");

    return suppliers;
  }

  async findSupplierById(id: string): Promise<Supplier> {
    const supplier: Supplier | null = await this.supplierRepository.findOneBy({
      id,
    });
    if (!supplier) throw new NotFoundException("Supplier not founds");

    return supplier;
  }

  async findSuppliersByIds(ids: string[]): Promise<Supplier[]> {
    const suppliers: Supplier[] = await this.supplierRepository.findByIds(ids);
    if (!suppliers || suppliers.length === 0)
      throw new NotFoundException("Suppliers not founds");

    return suppliers;
  }

  async updatedSupplier(
    id: string,
    updateSupplierDto: UpdateSupplierDto,
  ): Promise<Supplier> {
    const supplierPreloaded: Supplier | undefined =
      await this.supplierRepository.preload({
        id,
        ...updateSupplierDto,
      });

    if (!supplierPreloaded) throw new NotFoundException("Supplier not found");

    return await this.supplierRepository.save(supplierPreloaded);
  }

  async deleteSupplier(id: string): Promise<Supplier> {
    const supplier: Supplier | null = await this.supplierRepository.findOneBy({
      id,
    });
    if (!supplier) throw new NotFoundException("Supplier not found");

    await this.supplierRepository.delete(id);

    return supplier;
  }
}
