import { InventoryMovementType } from "src/common/enums";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class InventoryMovement {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, name: "product_id" })
  productId: string;

  @Column({ type: "enum", enum: "InventoryMovementType" })
  type: InventoryMovementType;

  @Column({ type: "real", precision: 5 })
  quantity: number;

  @Column()
  note: string;

  @Column({ name: "order_id" })
  orderId: string;

  @Column({ name: "created_at" })
  createdAt: string;
}
