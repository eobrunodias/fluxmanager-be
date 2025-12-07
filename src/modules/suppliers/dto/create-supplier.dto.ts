import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
} from "class-validator";

export class CreateSupplierDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 100)
  name: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  @Length(100)
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 255)
  address: string;
}
