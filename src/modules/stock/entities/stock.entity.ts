import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Stock {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true, name: "product_id" })
  productId: string;

  @Column({ type: "int", default: 0 })
  quantity: number;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
