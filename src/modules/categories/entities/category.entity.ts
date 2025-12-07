import { Column, Entity } from "typeorm";

@Entity()
export class Category {
  @Column()
  id: string;
  @Column()
  name: string;
  @Column()
  description: string;
}
