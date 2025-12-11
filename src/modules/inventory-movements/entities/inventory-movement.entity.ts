import { InventoryMovementType } from "src/common/enums";
import { Order } from "src/modules/orders/entities/order.entity";
import { Product } from "src/modules/products/entities/product.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class InventoryMovement {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "enum", enum: InventoryMovementType })
  type: InventoryMovementType;

  @Column({ type: "int" })
  quantity: number;

  @Column({ nullable: true })
  note?: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @ManyToOne(() => Product, (product) => product.inventoryMovements)
  @JoinColumn({ name: "product_id" })
  productId: string;

  @ManyToOne(() => Order, (order) => order.inventoryMovements)
  @JoinColumn({ name: "order_id" })
  order: Order;
}
