import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { Model } from 'mongoose';
import { User } from 'src/users/interface/user.interface';
declare global {
    namespace Express {
        interface Request {
            currentUser?: User;
        }
    }
}
export declare class UserIdMiddleware implements NestMiddleware {
    private userModel;
    constructor(userModel: Model<User>);
    use(req: Request, res: Response, next: NextFunction): Promise<void>;
}
