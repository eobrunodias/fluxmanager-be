import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateSupplierDto } from "./dto/create-supplier.dto";
import { UpdateSupplierDto } from "./dto/update-supplier.dto";
import { Supplier } from "./entities/supplier.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private readonly repository: Repository<Supplier>,
  ) {}

  async create(createSupplierDto: CreateSupplierDto, productId: string) {
    if (!createSupplierDto)
      throw new BadRequestException("Invalid supplier data");
    if (!productId) throw new BadRequestException("productId is invalid");

    const { address, email, name, phone } = createSupplierDto;

    const existing = await this.repository.findOne({
      where: [
        {
          address,
        },
        {
          email,
        },
        {
          name,
        },
        { phone },
      ],
    });

    if (existing) {
      if (address === existing.address)
        throw new ConflictException("Address already exists");
      if (email === existing.email)
        throw new ConflictException("Email already exists");
      if (name === existing.name)
        throw new ConflictException("Name already exists");
      if (phone === existing.phone)
        throw new ConflictException("Phone already exists");
    }

    const supplier = {
      product: {
        id: productId,
      },
      ...createSupplierDto,
    };

    const supplierCreated = this.repository.create(supplier);
    if (!supplierCreated) throw new ConflictException("Supplier not created");

    const supplierSaved = await this.repository.save(supplierCreated);
    if (!supplierSaved) throw new ConflictException("Supplier not saved");

    return supplierSaved;
  }

  async findAll() {
    const suppliers = await this.repository.find();

    if (!suppliers || suppliers.length === 0) {
      throw new NotFoundException("No suppliers found");
    }

    return suppliers;
  }

  async findOne(id: string) {
    if (!id) throw new BadRequestException("Id is required");

    const supplier = await this.repository.findOneBy({ id });
    if (!supplier) throw new NotFoundException("Supplier not found");

    return supplier;
  }

  async update(id: string, updateSupplierDto: UpdateSupplierDto) {
    if (!id) throw new BadRequestException("Id is required");
    if (!updateSupplierDto)
      throw new BadRequestException("Body data supplier is required");

    const supplier = await this.repository.findOneBy({ id });
    if (!supplier) throw new NotFoundException("Supplier not found");

    const supplierUpdated = {
      ...supplier,
      ...updateSupplierDto,
    };

    const supplierPreloaded = await this.repository.preload(supplierUpdated);
    if (!supplierPreloaded)
      throw new ConflictException("Supplier not preloaded");

    const supplierSaved = await this.repository.save(supplierPreloaded);
    if (!supplierSaved) throw new ConflictException("Supplier not saved");

    return supplierSaved;
  }

  async remove(id: string) {
    if (!id) throw new BadRequestException("Id is required");

    const supplier = await this.repository.findOneBy({ id });
    if (!supplier) throw new NotFoundException("Supplier not found");

    const supplierDeleted = await this.repository.delete({ id });
    if (!supplierDeleted) throw new ConflictException("Supplier not deleted");

    return supplier;
  }
}
