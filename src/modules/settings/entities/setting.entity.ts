import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum Currency {
  BRL = "BRL",
  USD = "USD",
  EUR = "EUR",
}

@Entity()
export class Setting {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "user_id" })
  userId: string;

  @Column({ name: "store_name", length: 100 })
  storeName: string;

  @Column({ name: "store_logo", length: 255, nullable: true })
  storeLogo?: string;

  @Column({ type: "enum", enum: Currency, default: Currency.BRL })
  currency: Currency;

  @Column({ length: 50 })
  timezone: Date;
}
