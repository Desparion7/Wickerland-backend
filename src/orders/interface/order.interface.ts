export interface Product {
  pid: string;
  name: string;
  amount: number;
  category: string;
  qty: number;
  price: number;
  img: string[];
}
export interface Order {
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
  paid: boolean;
}
