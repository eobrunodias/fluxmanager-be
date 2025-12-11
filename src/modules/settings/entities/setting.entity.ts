import { Currency } from "src/common/enums";
import { User } from "src/modules/users/entities/user.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Setting {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "store_name", length: 100 })
  storeName: string;

  @Column({ name: "store_logo", length: 255, nullable: true })
  storeLogo?: string;

  @Column({ type: "enum", enum: Currency, default: Currency.BRL })
  currency: Currency;

  @Column({ length: 50 })
  timezone: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @OneToOne(() => User, (user) => user.setting)
  @JoinColumn({ name: "user_id" })
  user: User;
}
