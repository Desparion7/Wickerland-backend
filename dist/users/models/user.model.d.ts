import * as mongoose from 'mongoose';
export declare const UserSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    cart: any[];
    wishlist: any[];
    address: {
        name?: string;
        surname?: string;
        companyName?: string;
        street?: string;
        postcode?: string;
        city?: string;
        phone?: string;
    };
    email?: string;
    password?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    cart: any[];
    wishlist: any[];
    address: {
        name?: string;
        surname?: string;
        companyName?: string;
        street?: string;
        postcode?: string;
        city?: string;
        phone?: string;
    };
    email?: string;
    password?: string;
}>> & Omit<mongoose.FlatRecord<{
    cart: any[];
    wishlist: any[];
    address: {
        name?: string;
        surname?: string;
        companyName?: string;
        street?: string;
        postcode?: string;
        city?: string;
        phone?: string;
    };
    email?: string;
    password?: string;
}> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
