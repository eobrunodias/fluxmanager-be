import { Module } from "@nestjs/common";
import { ProductsService } from "./products.service";
import { ProductsController } from "./products.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./entities/product.entity";
import { Category } from "../categories/entities/category.entity";
import { Supplier } from "../suppliers/entities/supplier.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, Supplier])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
