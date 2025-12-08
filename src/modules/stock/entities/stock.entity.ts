import { Product } from "src/modules/products/entities/product.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Stock {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, name: "product_id" })
  productId: string;

  @Column({ type: "int", default: 0 })
  quantity: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToOne(() => Product, (product) => product.stock)
  @JoinColumn()
  product: Product;
}
