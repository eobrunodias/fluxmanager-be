import { Column, Entity } from "typeorm";

@Entity()
export class Payment {
  @Column()
  id: string;
  @Column()
  orderId: string;
  @Column()
  method: string;
  @Column()
  amount: number;
  @Column()
  status: string;
  @Column()
  createdAt: Date;
  @Column()
  updatedAt: Date;
}
