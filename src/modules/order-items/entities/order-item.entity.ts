import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "order_id" })
  orderId: string;

  @Column({ name: "product_id" })
  productId: string;

  @Column({ type: "int" })
  quantity: number;

  @Column({ name: "unit_price", type: "decimal", precision: 10, scale: 2 })
  unitPrice: number;
}
