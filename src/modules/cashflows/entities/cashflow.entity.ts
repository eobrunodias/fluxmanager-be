import { CashflowType } from "src/common/enums";
import { Order } from "src/modules/orders/entities/order.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Cashflow {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "enum", enum: CashflowType })
  type: CashflowType;

  @Column({ length: 255 })
  description: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  value: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @ManyToOne(() => Order, (order) => order.cashflows)
  @JoinColumn({ name: "order_id" })
  order: Order[];
}
