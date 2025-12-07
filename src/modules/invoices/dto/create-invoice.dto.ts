import { IsNotEmpty, IsString, IsUUID, MaxLength } from "class-validator";

export class CreateInvoiceDto {
  @IsUUID()
  orderId: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  pdfUrl: string;
}
