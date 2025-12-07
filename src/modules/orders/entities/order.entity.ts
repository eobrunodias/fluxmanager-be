import { Column, Entity } from "typeorm";

@Entity()
export class Order {
  @Column()
  id: string;
  @Column()
  clientId: string;
  @Column()
  userId: string;
  @Column()
  status: string;
  @Column()
  total: string;
  @Column()
  createdAt: string;
  @Column()
  updatedAt: string;
}
