import { Order } from "src/modules/orders/entities/order.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  UpdateDateColumn,
} from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Client {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ length: 200 })
  address: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToMany(() => Order, (order) => order.client)
  orders: Order[];
}
