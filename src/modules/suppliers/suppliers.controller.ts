import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from "@nestjs/common";
import { SuppliersService } from "./suppliers.service";
import { CreateSupplierDto } from "./dto/create-supplier.dto";
import { UpdateSupplierDto } from "./dto/update-supplier.dto";
import { Supplier } from "./entities/supplier.entity";

@Controller("suppliers")
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @Post("products/:productId")
  create(
    @Body() createSupplierDto: CreateSupplierDto,
    @Param("productId", ParseUUIDPipe) productId: string,
  ): Promise<Supplier> {
    return this.suppliersService.create(createSupplierDto, productId);
  }

  @Get()
  findAll(): Promise<Supplier[]> {
    return this.suppliersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<Supplier> {
    return this.suppliersService.findOne(id);
  }

  @Patch(":id")
  update(
    @Param("id") id: string,
    @Body() updateSupplierDto: UpdateSupplierDto,
  ): Promise<Supplier> {
    return this.suppliersService.update(id, updateSupplierDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<Supplier> {
    return this.suppliersService.remove(id);
  }
}
