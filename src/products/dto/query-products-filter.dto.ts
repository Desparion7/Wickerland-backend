import { IsNumber } from 'class-validator';
import { Transform } from 'class-transformer';

export class ProductsFilterDto {
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  pageNumber: number;

  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  pageSize: number;
}
