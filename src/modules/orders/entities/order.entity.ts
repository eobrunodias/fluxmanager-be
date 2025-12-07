import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export enum OrderStatus {
  PENDING = "pending",
  CONFIRMED = "confirmed",
  PREPARING = "preparing",
  SHIPPED = "shipped",
  DELIVERED = "delivered",
  CANCELED = "canceled",
  RETURNED = "returned",
}

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
