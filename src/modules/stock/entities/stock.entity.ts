import { Column, Entity } from "typeorm";

@Entity()
export class Stock {
  @Column()
  id: string;
  @Column()
  productId: string;
  @Column()
  quantity: number;
  @Column()
  updatedAt: Date;
}
