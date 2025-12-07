import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Cashflow {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ enum: ["type1, type2, type3"] })
  type: number;
  @Column()
  orderId: number;
  @Column()
  description: string;
  @Column()
  value: number;
  @CreateDateColumn()
  createdAt: Date;
}
