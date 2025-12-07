import { IsNotEmpty, IsString, Length } from "class-validator";

export class CreateCategoryDto {
  @IsNotEmpty()
  @Length(10, 100)
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  @Length(10, 255)
  description: string;
}
