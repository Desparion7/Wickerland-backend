export interface User {
  _id: string;
  email: string;
  password?: string;
  cart?: {
    pid: string;
    name: string;
    amount: number;
    category: string;
    qty: number;
    price: number;
    img: string[];
  };
  wishlist?: {
    pid: string;
    name: string;
    category: string;
    price: number;
    img: string[];
  };
}
