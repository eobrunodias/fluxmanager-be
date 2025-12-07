import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Min,
} from "class-validator";
import { InventoryMovementType } from "src/common/enums";

export class CreateInventoryMovementDto {
  @IsUUID()
  productId: string;

  @IsNotEmpty()
  @IsEnum(InventoryMovementType)
  type: InventoryMovementType;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  quantity: number;

  @IsString()
  @IsOptional()
  note: string;

  @IsUUID()
  orderId: string;
}
