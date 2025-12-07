import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
export class Invoice {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ name: "order_id" })
  orderId: string;

  @Column({ name: "pdf_url", length: 255 })
  pdfUrl: string;

  @CreateDateColumn({ name: "created_at" })
  createdAt: Date;
}
