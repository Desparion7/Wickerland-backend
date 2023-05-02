import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/interface/user.interface';
import * as jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      currentUser?: User;
    }
  }
}

@Injectable()
export class UserIdMiddleware implements NestMiddleware {
  constructor(@InjectModel('Users') private userModel: Model<User>) {}
  async use(req: Request, res: Response, next: NextFunction) {
    const authorizationHeader = req.headers['authorization'];

    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
      const token = req.headers.authorization?.split(' ')[1];

      if (token) {
        const token = authorizationHeader.split(' ')[1];
        try {
          // Verefication and decoded tokena JWT
          const decodedToken: any = jwt.verify(
            token,
            process.env.ACCESS_TOKEN_SECRET,
          );

          const userId = decodedToken.UserInfo.id;
          if (userId) {
            const user = await this.userModel.findById(userId);
            // console.log(user);
            const { _id, email } = user;
            req.currentUser = { _id, email };
          }
        } catch (error) {
          console.error('Błąd weryfikacji tokena:', error);
        }
      }
    }

    next();
  }
}
