import { Column, Entity } from "typeorm";

@Entity()
export class Supplier {
  @Column()
  id: string;
  @Column()
  name: string;
  @Column()
  phone: string;
  @Column()
  email: string;
  @Column()
  address: string;
}
