import { Column, Entity } from "typeorm";

@Entity()
export class Setting {
  @Column()
  id: string;
  @Column()
  userId: string;
  @Column()
  storeName: string;
  @Column()
  storeLogo: string;
  @Column()
  currency: string;
  @Column()
  timezone: string;
}
