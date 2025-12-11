import { Category } from "src/modules/categories/entities/category.entity";
import { InventoryMovement } from "src/modules/inventory-movements/entities/inventory-movement.entity";
import { OrderItem } from "src/modules/order-items/entities/order-item.entity";
import { Stock } from "src/modules/stock/entities/stock.entity";
import { Supplier } from "src/modules/suppliers/entities/supplier.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  name: string;

  // Stock Keeping Unit
  @Column({ length: 50, unique: true })
  sku: string;

  @Column({ length: 30, unique: true })
  barcode: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  price: number;

  @Column({ length: 255 })
  description: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: "category_id" })
  category: Category;

  @ManyToMany(() => Supplier, (supplier) => supplier.products)
  suppliers: Supplier[];

  @OneToOne(() => Stock, (stock) => stock.product)
  stock: Stock;

  @OneToMany(() => OrderItem, (ordemItem) => ordemItem.product)
  ordemItems: OrderItem[];

  @OneToMany(() => InventoryMovement, (im) => im.product)
  inventoryMovements: InventoryMovement[];
}
