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

export class CreateCashflowsDto {
  @IsNotEmpty()
  @IsEnum(CashflowType)
  type: CashflowType;

  @IsUUID()
  order: string;

  @IsString()
  @IsOptional()
  @MaxLength(255)
  description?: string;

  @IsNotEmpty()
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  value: number;
}
