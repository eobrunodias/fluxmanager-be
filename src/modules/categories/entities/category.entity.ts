import { Product } from "src/modules/products/entities/product.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Category {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 255 })
  description: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
