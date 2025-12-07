import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsUUID,
  Min,
} from "class-validator";
import { PaymentMethod, PaymentStatus } from "src/common/enums";

export class CreatePaymentDto {
  @IsUUID()
  orderId: string;

  @IsNotEmpty()
  @IsEnum(PaymentMethod)
  method: PaymentMethod;

  @Min(0.01)
  @IsNumber({ maxDecimalPlaces: 2 })
  amount: number;

  @IsEnum(PaymentStatus)
  @IsOptional()
  status?: PaymentStatus;
}
