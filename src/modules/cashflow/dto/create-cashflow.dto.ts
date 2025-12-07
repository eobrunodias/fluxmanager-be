import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
} from "class-validator";
import { CashflowType } from "src/common/enums";

export class CreateCashflowDto {
  @IsNotEmpty()
  @IsEnum(CashflowType)
  type: CashflowType;

  @IsUUID()
  orderId: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  description?: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  value: number;
}
