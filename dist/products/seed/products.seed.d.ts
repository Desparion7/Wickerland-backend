import { Seeder } from 'nestjs-seeder';
import { Model } from 'mongoose';
import { Product } from '../interface/product.interface';
export declare class ProductsSeeder implements Seeder {
    private readonly products;
    constructor(products: Model<Product>);
    seed(): Promise<any>;
    drop(): Promise<any>;
}
