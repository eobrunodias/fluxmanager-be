import { Column, Entity } from "typeorm";

@Entity()
export class Client {
  @Column()
  id: string;
  @Column()
  name: string;
  @Column()
  email: string;
  @Column()
  phone: string;
  @Column()
  adress: string;
  @Column()
  created_at: Date;
  @Column()
  updated_at: Date;
}
