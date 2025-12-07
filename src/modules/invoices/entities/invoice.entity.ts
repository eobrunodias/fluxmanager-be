import { Column, Entity } from "typeorm";

@Entity()
export class Invoice {
  @Column()
  id: string;
  @Column()
  orderId: string;
  @Column()
  pdfUrl: string;
  @Column()
  createdAt: Date;
}
