import {
  ArrayNotEmpty,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
  Length,
  MaxLength,
  Min,
} from "class-validator";

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @Length(10, 100)
  name: string;

  @IsNotEmpty()
  @Length(5, 50)
  @IsString()
  sku: string;

  @IsNotEmpty()
  @Length(5, 30)
  @IsString()
  barcode: string;

  @IsNotEmpty()
  @Min(0.01)
  @IsNumber({ maxDecimalPlaces: 2 })
  price: number;

  @IsNotEmpty()
  @MaxLength(255)
  @IsString()
  description: string;

  @IsUUID()
  categoryId: string;

  @IsArray()
  @ArrayNotEmpty()
  @IsUUID("4", { each: true })
  supplierIds: string[];
}
