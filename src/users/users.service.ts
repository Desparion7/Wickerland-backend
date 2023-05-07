import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interface/user.interface';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Response } from 'express';
import { CustomRequest } from 'src/orders/orders.controller';
import { CartDto } from './dto/cart.dto';

const saltRounds = 10;

@Injectable()
export class UsersService {
  constructor(@InjectModel('Users') private userModel: Model<User>) {}

  //   Create New user
  async signup(email: string, password: string) {
    // See if email is in use
    const userExists = await this.userModel.findOne({ email }).exec();
    if (userExists) {
      throw new ConflictException(
        'Użytkownik o podanym adresie e-mail już istnieje',
      );
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = new this.userModel({ email, password: hashedPassword });
    const result = await newUser.save();
    return result;
  }
  async signin(email: string, password: string) {
    const [user] = await this.userModel.find({ email });
    if (!user) {
      throw new NotFoundException('Nieprawidłowy email lub hasło');
    }
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      throw new BadRequestException('Nieprawidłowy email lub hasło');
    }
    // Generate acces and refresh token
    const accessToken = jwt.sign(
      {
        UserInfo: {
          id: user._id,
          email: user.email,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1d' },
    );
    const refreshToken = jwt.sign(
      {
        email: user.email,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' },
    );
    const cart = user.cart;
    // Send accessToken containing username
    return { accessToken, refreshToken, cart };
  }
  async logout(res: Response) {
    const cookies = res.req.cookies;
    if (!cookies?.jwt) return res.sendStatus(204); //No content
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    return res.json({ message: 'Cookie wyczyszczone' });
  }

  async refresh(refreshToken: string): Promise<string> {
    try {
      const decoded: any = jwt.verify(
        refreshToken,
        process.env.REFRESH_TOKEN_SECRET,
      );
      const user = await this.userModel.findOne({ email: decoded.email });
      if (!user) {
        throw new UnauthorizedException('Brak autoryzacji');
      }
      const accessToken = jwt.sign(
        {
          UserInfo: {
            id: user._id,
            email: user.email,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1d' },
      );
      return accessToken;
    } catch (error) {
      throw new UnauthorizedException('Dostęp zabroniony');
    }
  }
  async updateCart(body: CartDto, req: CustomRequest) {
    const user = await this.userModel.findById(req.currentUser._id);
    const cart = body.cart;
    user.cart = cart;
    await user.save();
    return;
  }
}
