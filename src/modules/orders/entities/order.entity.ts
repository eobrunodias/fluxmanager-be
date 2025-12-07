import { OrderStatus } from "src/common/enums";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "client_id" })
  clientId: string;

  @Column({ name: "user_id" })
  userId: string;

  @Column({ type: "enum", enum: OrderStatus })
  status: OrderStatus;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  total: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: string;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: string;
}
