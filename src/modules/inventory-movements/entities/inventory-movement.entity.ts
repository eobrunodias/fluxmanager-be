import { InventoryMovementType } from "src/common/enums";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class InventoryMovement {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "product_id" })
  productId: string;

  @Column({ type: "enum", enum: InventoryMovementType })
  type: InventoryMovementType;

  @Column({ type: "int" })
  quantity: number;

  @Column({ nullable: true })
  note?: string;

  @Column({ name: "order_id" })
  orderId: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}
