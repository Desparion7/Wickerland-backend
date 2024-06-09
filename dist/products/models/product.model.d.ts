import * as mongoose from 'mongoose';
export declare const ProductsSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    parameters: any[];
    img: string[];
    pid?: string;
    name?: string;
    description?: string;
    category?: string;
    subcategory?: string;
    amount?: number;
    price?: number;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    parameters: any[];
    img: string[];
    pid?: string;
    name?: string;
    description?: string;
    category?: string;
    subcategory?: string;
    amount?: number;
    price?: number;
}>> & Omit<mongoose.FlatRecord<{
    parameters: any[];
    img: string[];
    pid?: string;
    name?: string;
    description?: string;
    category?: string;
    subcategory?: string;
    amount?: number;
    price?: number;
}> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
