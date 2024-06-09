import * as mongoose from 'mongoose';
export declare const MessageSchema: mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    name?: string;
    surname?: string;
    phone?: string;
    email?: string;
    message?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name?: string;
    surname?: string;
    phone?: string;
    email?: string;
    message?: string;
}>> & Omit<mongoose.FlatRecord<{
    name?: string;
    surname?: string;
    phone?: string;
    email?: string;
    message?: string;
}> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
