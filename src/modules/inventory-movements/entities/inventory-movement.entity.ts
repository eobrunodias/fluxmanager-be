import { InventoryMovementType } from "src/common/enums";
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

  @Column({ name: "order_id" })
  orderId: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @ManyToOne(() => Product, (product) => product.inventoryMovement)
  @JoinColumn()
  products: Product[];
}
