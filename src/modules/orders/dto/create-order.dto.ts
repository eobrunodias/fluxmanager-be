import { IsEnum, IsNumber, IsOptional, IsUUID, Min } from "class-validator";
import { OrderStatus } from "src/common/enums";

export class CreateOrderDto {
  @IsUUID()
  clientId: string;

  @IsUUID()
  userId: string;

  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  total: number;
}
