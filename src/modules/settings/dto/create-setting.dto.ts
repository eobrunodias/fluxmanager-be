import {
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Length,
  MaxLength,
} from "class-validator";
import { Currency } from "src/common/enums";

export class CreateSettingDto {
  @IsUUID()
  userId: string;

  @IsString()
  @Length(10, 100)
  storeName: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  storeLogo: string;

  @IsNotEmpty()
  @IsEnum(Currency)
  currency?: Currency;

  @IsNotEmpty()
  @IsString()
  @Length(5, 50)
  timezone: string;
}
