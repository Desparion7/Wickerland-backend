import { IsString, IsNumber, IsEmail, IsOptional } from 'class-validator';
import { Product } from '../interface/order.interface';

export class CreateOrderDto {
  @IsString()
  name: string;
  @IsString()
  surname: string;
  @IsString()
  @IsOptional()
  companyName?: string;
  @IsString()
  street: string;
  @IsString()
  postcode: string;
  @IsString()
  city: string;
  @IsString()
  phone: string;
  @IsEmail()
  email: string;
  @IsString()
  @IsOptional()
  message?: string;
  @IsString()
  paymentMethod: string;
  @IsString()
  deliveryMethod: string;
  @IsNumber()
  price: number;
  products: Product[];
}
