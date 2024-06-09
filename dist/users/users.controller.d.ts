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
/// <reference types="mongoose" />
/// <reference types="mongoose/types/inferschematype" />
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Response, Request } from 'express';
import { CartDto } from './dto/cart.dto';
import { WishlistDto } from './dto/wishlist.dto';
import { AddressDto } from './dto/address.dto';
import { CustomRequest } from 'src/orders/orders.controller';
export declare class UsersController {
    private usersService;
    constructor(usersService: UsersService);
    createUser(body: CreateUserDto): Promise<import("mongoose").Document<unknown, {}, import("./interface/user.interface").User> & Omit<import("./interface/user.interface").User & Required<{
        _id: string;
    }>, never>>;
    login(email: string, password: string, response: Response): Promise<Response<any, Record<string, any>>>;
    logout(res: Response): Promise<Response<any, Record<string, any>>>;
    refresh(req: Request, res: Response): Promise<void>;
    getAddress(req: CustomRequest): Promise<{
        name: string;
        surname: string;
        companyName?: string;
        street: string;
        postcode: string;
        city: string;
        phone: string;
    }>;
    updateAddress(body: AddressDto, req: CustomRequest): Promise<import("mongoose").Document<unknown, {}, import("./interface/user.interface").User> & Omit<import("./interface/user.interface").User & Required<{
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
    forgotPassword(body: {
        email: string;
    }, res: Response): Promise<void>;
    newPassword(body: {
        token: string;
        password: string;
    }, res: Response): Promise<void>;
}
