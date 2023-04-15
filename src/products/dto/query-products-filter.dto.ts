import { IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';

export class ProductsFilterDto {
  @IsOptional()
  category: string;

  @IsOptional()
  subcategory: string;

  @IsOptional()
  search: string;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  pageNumber: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  pageSize: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  min: number;

  @IsOptional()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  max: number;
}
