import { Column, Entity } from "typeorm";

@Entity()
export class Product {
  @Column()
  id: string;
  @Column()
  name: string;
  @Column()
  sku: string;
  @Column()
  barcode: string;
  @Column()
  price: string;
  @Column()
  description: string;
  @Column()
  categoryId: string;
  @Column()
  supplierId: string;
  @Column()
  createdAt: string;
  @Column()
  updatedAt: string;
}
