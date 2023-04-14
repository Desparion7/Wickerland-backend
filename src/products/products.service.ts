import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './interface/product.interface';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async getProducts({
    pageNumber = 1,
    pageSize = 9,
  }): Promise<{ products: Product[]; totalPages: number }> {
    const count = await this.productModel.countDocuments();
    const totalPages = Math.ceil(count / pageSize);

    const products = await this.productModel
      .find()
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .exec();
    return { products, totalPages };
  }
}
