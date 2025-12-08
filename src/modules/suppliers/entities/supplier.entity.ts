import { Product } from "src/modules/products/entities/product.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 30 })
  phone: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 255 })
  address: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @ManyToMany(() => Product, (product) => product.suppliers)
  @JoinTable({ name: "supplier_products" })
  products: Product[];
}
