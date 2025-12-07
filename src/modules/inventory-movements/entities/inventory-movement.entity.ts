import { Column, Entity } from "typeorm";

@Entity()
export class InventoryMovement {
  @Column()
  id: number;
  @Column()
  productId: string;
  @Column()
  type: string;
  @Column()
  quantity: number;
  @Column()
  note: string;
  @Column()
  orderId: string;
  @Column()
  createdAt: string;
}
