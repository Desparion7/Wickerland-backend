export class CartDto {
  cart: {
    pid: string;
    name: string;
    amount: number;
    category: string;
    qty: number;
    price: number;
    img: string[];
  };
}
