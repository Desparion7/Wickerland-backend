/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { Product } from './interface/product.interface';
export declare class ProductsService {
    private productModel;
    constructor(productModel: Model<Product>);
    getProducts({ pageNumber, pageSize, min, max, category, subcategory, search, sort, }: {
        pageNumber?: number;
        pageSize?: number;
        min: any;
        max: any;
        category: any;
        subcategory: any;
        search: any;
        sort: any;
    }): Promise<{
        products: Product[];
        totalPages: number;
    }>;
    getProductByPid(pid: string): Promise<{
        product: import("mongoose").Document<unknown, {}, Product> & Omit<Product & {
            _id: import("mongoose").Types.ObjectId;
        }, never>;
    }>;
}
