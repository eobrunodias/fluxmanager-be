import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
} from "class-validator";

export class CreateClientDto {
  @IsNotEmpty()
  @IsString()
  @Length(10, 100)
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Length(10, 100)
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber()
  @Length(10, 20)
  phone: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 200)
  address: string;
}
