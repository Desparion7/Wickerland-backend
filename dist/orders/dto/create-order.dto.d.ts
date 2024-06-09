import { Product } from '../interface/order.interface';
export declare class CreateOrderDto {
    name: string;
    surname: string;
    companyName?: string;
    street: string;
    postcode: string;
    city: string;
    phone: string;
    email: string;
    message?: string;
    paymentMethod: string;
    deliveryMethod: string;
    price: number;
    products: Product[];
}
