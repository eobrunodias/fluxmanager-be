import { forwardRef, Module } from "@nestjs/common";
import { SuppliersService } from "./suppliers.service";
import { SuppliersController } from "./suppliers.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Supplier } from "./entities/supplier.entity";
import { SuppliersRepository } from "./repositories/suppliers.repository";
import { ProductsModule } from "../products/products.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Supplier]),
    forwardRef(() => ProductsModule),
  ],
  controllers: [SuppliersController],
  providers: [SuppliersService, SuppliersRepository],
  exports: [SuppliersRepository],
})
export class SuppliersModule {}
