import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Supplier {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column({ length: 200 })
  address: string;
}
