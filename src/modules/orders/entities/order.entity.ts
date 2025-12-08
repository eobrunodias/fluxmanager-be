import { OrderStatus } from "src/common/enums";
import { Cashflow } from "src/modules/cashflows/entities/cashflow.entity";
import { Client } from "src/modules/clients/entities/client.entity";
import { Invoice } from "src/modules/invoices/entities/invoice.entity";
import { OrderItem } from "src/modules/order-items/entities/order-item.entity";
import { Payment } from "src/modules/payments/entities/payment.entity";
import { User } from "src/modules/users/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Order {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "enum", enum: OrderStatus, default: OrderStatus.PENDING })
  status: OrderStatus;

  @Column({ type: "decimal", precision: 10, scale: 2 })
  total: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  // Obligatory
  @ManyToOne(() => Client, (client) => client.orders)
  @JoinColumn({ name: "client_id" })
  client: Client;

  // Optional
  @ManyToOne(() => User, { nullable: true })
  @JoinColumn({ name: "user_id" })
  user?: User;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.orders)
  ordemItem: OrderItem;

  @OneToMany(() => Payment, (payment) => payment.orders)
  payment: Payment;

  @OneToOne(() => Invoice, (invoice) => invoice.order)
  invoice: Invoice;

  @OneToMany(() => Cashflow, (cashflow) => cashflow.orders)
  cashflow: Cashflow;
}
