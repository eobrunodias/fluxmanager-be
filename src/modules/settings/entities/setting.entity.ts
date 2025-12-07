import { Currency } from "src/common/enums";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
  timezone: string;
}
