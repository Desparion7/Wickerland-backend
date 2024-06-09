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
import { User } from './interface/user.interface';
import { Response } from 'express';
import { CustomRequest } from 'src/orders/orders.controller';
import { CartDto } from './dto/cart.dto';
import { WishlistDto } from './dto/wishlist.dto';
import { AddressDto } from './dto/address.dto';
export declare class UsersService {
    private userModel;
    constructor(userModel: Model<User>);
    signup(email: string, password: string): Promise<import("mongoose").Document<unknown, {}, User> & Omit<User & Required<{
        _id: string;
    }>, never>>;
    signin(email: string, password: string): Promise<{
        accessToken: string;
        refreshToken: string;
        cart: {
            pid: string;
            name: string;
            amount: number;
            category: string;
            qty: number;
            price: number;
            img: string[];
        };
        wishlist: {
            pid: string;
            name: string;
            category: string;
            price: number;
            img: string[];
        };
    }>;
    logout(res: Response): Promise<Response<any, Record<string, any>>>;
    refresh(refreshToken: string): Promise<string>;
    getAddress(req: CustomRequest): Promise<{
        name: string;
        surname: string;
        companyName?: string;
        street: string;
        postcode: string;
        city: string;
        phone: string;
    }>;
    updateAddress(body: AddressDto, req: CustomRequest): Promise<import("mongoose").Document<unknown, {}, User> & Omit<User & Required<{
        _id: string;
    }>, never>>;
    updateCart(body: CartDto, req: CustomRequest): Promise<{
        pid: string;
        name: string;
        amount: number;
        category: string;
        qty: number;
        price: number;
        img: string[];
    }>;
    updateWishList(body: WishlistDto, req: CustomRequest): Promise<{
        pid: string;
        name: string;
        category: string;
        price: number;
        img: string[];
    }>;
    sendResetPasswordEmail(email: string): Promise<void>;
    setNewPassword(body: {
        token: string;
        password: string;
    }): Promise<void>;
}
