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
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from 'src/users/interface/user.interface';
export interface CustomRequest extends Request {
    currentUser?: User;
}
export declare class OrdersController {
    private orderService;
    constructor(orderService: OrdersService);
    createNewOrder(body: CreateOrderDto, req: CustomRequest): Promise<(import("mongoose").Document<unknown, {}, import("./interface/order.interface").Order> & Omit<import("./interface/order.interface").Order & {
        _id: import("mongoose").Types.ObjectId;
    }, never>) | {
        success: boolean;
        error: string;
    }>;
    getUserOrders(req: CustomRequest, page: string): Promise<{
        orders: (import("mongoose").Document<unknown, {}, import("./interface/order.interface").Order> & Omit<import("./interface/order.interface").Order & {
            _id: import("mongoose").Types.ObjectId;
        }, never>)[];
        totalPages: number;
    }>;
    getSingleOrder(id: string): Promise<(import("mongoose").Document<unknown, {}, import("./interface/order.interface").Order> & Omit<import("./interface/order.interface").Order & {
        _id: import("mongoose").Types.ObjectId;
    }, never>) | {
        success: boolean;
        error: string;
    }>;
}
