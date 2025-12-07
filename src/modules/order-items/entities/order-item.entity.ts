import { Column, Entity } from "typeorm";

@Entity()
export class OrderItem {
  @Column()
  id: string;
  @Column()
  orderId: string;
  @Column()
  productId: string;
  @Column()
  quantity: number;
  @Column()
  unitPrice: string;
}
