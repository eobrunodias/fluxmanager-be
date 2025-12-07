import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export enum PaymentMethod {
  PIX = "pix",
  CREDIT = "credit",
  DEBIT = "debit",
  CASH = "cash",
  BANK_TRANSFER = "bank_transfer",
  BOLETO = "boleto",
  PAYPAL = "paypal",
  APPLE_PAY = "apple_pay",
  GOOGLE_PAY = "google_pay",
}

export enum PaymentStatus {
  PENDING = "pending",
  COMPLETED = "completed",
  FAILED = "failed",
  CANCELED = "canceled",
  REFUNDED = "refunded",
}

@Entity()
export class Payment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "order_id" })
  orderId: string;

  @Column({ type: "enum", enum: "PaymentMethod" })
  method: PaymentMethod;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  amount: number;

  @Column({ type: "enum", enum: PaymentStatus })
  status: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
