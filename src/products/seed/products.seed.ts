import { Seeder } from 'nestjs-seeder';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../interface/product.interface';
import { products as productsData } from '../db/products.db';

@Injectable()
export class ProductsSeeder implements Seeder {
  constructor(
    @InjectModel('Products')
    private readonly products: Model<Product>,
  ) {}

  async seed(): Promise<any> {
    const products = productsData.map((productsData) => ({
      pid: productsData.pid,
      name: productsData.name,
      description: productsData.description,
      category: productsData.category,
      subcategory: productsData.subcategory,
      amount: productsData.amount,
      price: productsData.price,
      parameters: productsData.parameters,
      img: productsData.img,
    }));
    return this.products.insertMany(products);
  }

  async drop(): Promise<any> {
    return this.products.deleteMany({});
  }
}
