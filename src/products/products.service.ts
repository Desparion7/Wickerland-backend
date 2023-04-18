import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './interface/product.interface';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private productModel: Model<Product>) {}

  async getProducts({
    pageNumber = 1,
    pageSize = 9,
    min,
    max,
    category,
    subcategory,
    search,
    sort,
  }): Promise<{ products: Product[]; totalPages: number }> {
    // find all products
    let query = this.productModel.find();

    // filter when category
    if (category !== 'undefined') {
      query = query.where('category').in([category]);
    }
    // filter when subcategory
    if (subcategory !== 'undefined') {
      query = query.where('subcategory').in([subcategory]);
    }

    // filter products by price min to max
    if (!isNaN(min) && !isNaN(max)) {
      query = query.where('price').gte(min).lte(max);
    }
    // search products by name
    if (search !== 'undefined') {
      query = query.where('name', new RegExp(search, 'i'));
    }
    // sort products by price
    if (sort === 'fromMax') {
      query = query.sort({ price: -1 }); // sort by descending order of price
    } else if (sort === 'fromMin') {
      query = query.sort({ price: 1 }); // sort by ascending order of price
    }

    const products = await query
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .exec();

    const count = await this.productModel.countDocuments(query.getQuery());
    const totalPages = Math.ceil(count / pageSize);

    return { products, totalPages };
  }
  async getProductByPid(pid: string) {
    const product = await this.productModel.findOne({ pid }).exec();
    if (!product) {
      throw new NotFoundException('nie znaleziono produktu o podanym id');
    }
    return { product };
  }
}
