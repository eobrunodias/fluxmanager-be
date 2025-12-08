import { Product } from "src/modules/products/entities/product.entity";
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "order_id" })
  orderId: string;

  @Column({ type: "int" })
  quantity: number;

  @Column({ name: "unit_price", type: "decimal", precision: 10, scale: 2 })
  unitPrice: number;

  @ManyToOne(() => Product, (product) => product.ordemItem)
  @JoinColumn()
  products: Product[];
}
