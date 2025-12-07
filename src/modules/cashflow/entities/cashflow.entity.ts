import { CashflowType } from "src/common/enums";
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Cashflow {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "enum", enum: CashflowType })
  type: CashflowType;

  @Column({ name: "order_id" })
  orderId: string;

  @Column({ length: 255 })
  description: string;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  value: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}
