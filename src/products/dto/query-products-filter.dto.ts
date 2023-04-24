import { IsNumber, IsString, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class ProductsFilterDto {
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

  @IsOptional()
  @IsString()
  category: string;

  @IsOptional()
  @IsString()
  subcategory: string;

  @IsOptional()
  @IsString()
  search: string;

  @IsOptional()
  sort: string;
}
