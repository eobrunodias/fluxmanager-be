import { UserRole } from "src/common/enums/user-role.enum";
import { Order } from "src/modules/orders/entities/order.entity";
import { Setting } from "src/modules/settings/entities/setting.entity";
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: "enum", enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;

  @UpdateDateColumn({ name: "updated_at" })
  updatedAt: Date;

  @Column({ default: false, name: "is_active" })
  isActive: boolean;

  @OneToOne(() => Setting, (setting) => setting.user)
  setting: Setting;

  @OneToMany(() => Order, (order) => order.user)
  order: Order[];
}
