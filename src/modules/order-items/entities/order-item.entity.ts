import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum OrderItemUnitPrice {
  REAL = "real",
  DOLAR = "dolar",
  EURO = "euro",
}

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "order_id" })
  orderId: string;

  @Column({ unique: true, name: "product_id" })
  productId: string;

  @Column({ type: "int", precision: 5 })
  quantity: number;

  @Column({
    name: "unit_price",
    type: "enum",
    enum: "OrderItemUnitPrice",
  })
  unitPrice: string;
}
