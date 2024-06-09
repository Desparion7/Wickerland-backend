import * as mongoose from 'mongoose';
export declare const OrderSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    products: {
        img: string[];
        pid?: string;
        name?: string;
        category?: string;
        amount?: number;
        price?: number;
        qty?: number;
    }[];
    email: string;
    paymentMethod: string;
    deliveryMethod: string;
    paid: boolean;
    name?: string;
    price?: number;
    date?: Date;
    surname?: string;
    companyName?: string;
    street?: string;
    postcode?: string;
    city?: string;
    phone?: string;
    message?: string;
    user?: {
        _id?: mongoose.Types.ObjectId;
        email?: string;
    };
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    products: {
        img: string[];
        pid?: string;
        name?: string;
        category?: string;
        amount?: number;
        price?: number;
        qty?: number;
    }[];
    email: string;
    paymentMethod: string;
    deliveryMethod: string;
    paid: boolean;
    name?: string;
    price?: number;
    date?: Date;
    surname?: string;
    companyName?: string;
    street?: string;
    postcode?: string;
    city?: string;
    phone?: string;
    message?: string;
    user?: {
        _id?: mongoose.Types.ObjectId;
        email?: string;
    };
}>> & Omit<mongoose.FlatRecord<{
    products: {
        img: string[];
        pid?: string;
        name?: string;
        category?: string;
        amount?: number;
        price?: number;
        qty?: number;
    }[];
    email: string;
    paymentMethod: string;
    deliveryMethod: string;
    paid: boolean;
    name?: string;
    price?: number;
    date?: Date;
    surname?: string;
    companyName?: string;
    street?: string;
    postcode?: string;
    city?: string;
    phone?: string;
    message?: string;
    user?: {
        _id?: mongoose.Types.ObjectId;
        email?: string;
    };
}> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
