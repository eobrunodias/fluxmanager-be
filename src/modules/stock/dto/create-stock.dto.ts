import { IsInt, Min } from "class-validator";

export class CreateStockDto {
  @IsInt()
  @Min(1)
  quantity: number;
}
