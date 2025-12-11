import { IsEnum, IsNumber, IsOptional, IsUUID, Min } from "class-validator";
import { OrderStatus } from "src/common/enums";

export class CreateOrderDto {
  @IsUUID()
  client: string;

  @IsUUID()
  @IsOptional()
  user?: string;

  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;

  @IsNumber({ maxDecimalPlaces: 2 })
  @Min(0.01)
  total: number;
}
