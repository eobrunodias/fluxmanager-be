import { Order } from "src/modules/orders/entities/order.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "pdf_url", length: 255 })
  pdfUrl: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @OneToOne(() => Order, (order) => order.invoice)
  @JoinColumn()
  order: Order;
}
