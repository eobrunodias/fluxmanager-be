import {
  Column,
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

  @Column({ type: "int", precision: 5 })
  quantity: number;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;
}
