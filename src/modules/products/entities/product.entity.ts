import {
  Column,
  CreateDateColumn,
  Entity,
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
  price: string;

  @Column({ length: 255 })
  description: string;

  @Column({ name: "category_id" })
  categoryId: string;

  @Column({ name: "supplier_id" })
  supplierId: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: string;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: string;
}
