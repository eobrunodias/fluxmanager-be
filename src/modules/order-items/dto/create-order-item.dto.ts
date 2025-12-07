import { IsInt, IsNotEmpty, IsNumber, IsUUID, Min } from "class-validator";

export class CreateOrderItemDto {
  @IsUUID()
  orderId: string;

  @IsUUID()
  productId: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  quantity: number;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  unitPrice: number;
}
