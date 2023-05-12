import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
  UnauthorizedException,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interface/user.interface';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { Response } from 'express';
import { CustomRequest } from 'src/orders/orders.controller';
import { CartDto } from './dto/cart.dto';
import { WishlistDto } from './dto/wishlist.dto';
import * as nodemailer from 'nodemailer';
import { JwtPayload } from 'jsonwebtoken';

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
    const wishlist = user.wishlist;
    // Send accessToken containing username
    return { accessToken, refreshToken, cart, wishlist };
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
    return cart;
  }
  async updateWishList(body: WishlistDto, req: CustomRequest) {
    const user = await this.userModel.findById(req.currentUser._id);
    const wishlist = body.wishlist;
    user.wishlist = wishlist;
    await user.save();
    return wishlist;
  }
  async sendResetPasswordEmail(email: string) {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new HttpException(
        'Brak użytkownika o podanym adresie e-mail',
        HttpStatus.NOT_FOUND,
      );
    }
    // generate reset token
    const token = jwt.sign(
      { id: user._id.toString() },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: '15min',
      },
    );
    // link for testing
    // const link = `http://localhost:5173/nowehasło/#access_token=${token}`;
    const link = `https://wik-land-front.vercel.app/nowehasło/#access_token=${token}`;

    // send email with reset link
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: 'Reset hasła w sklepie Wickerland',
      text:
        'Witaj! Otrzymałeś ten e-mail, ponieważ złożyłeś prośbę o zresetowanie hasła. Kliknij na poniższy link, aby przejść do strony resetowania hasła. Ważność linku wygaśnie po 15 minutach. ' +
        link,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      throw new InternalServerErrorException(
        'Wystąpił problem podczas wysyłania emaila resetującego hasło',
      );
    }
  }
  async setNewPassword(body: { token: string; password: string }) {
    const token = body.token;
    const password = body.password;
    let userID: string;

    jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET,
      (err, decoded: JwtPayload) => {
        if (err) {
          // when something go wrong on decoding
          throw new UnauthorizedException(
            'Token jest niepoprawny lub stracił ważność',
          );
        } else {
          userID = decoded.id;
        }
      },
    );
    const user = await this.userModel.findOne({ _id: userID }).exec();
    if (!user) {
      throw new HttpException(
        'Brak użytkownika o podanym adresie e-mail',
        HttpStatus.NOT_FOUND,
      );
    }
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    user.password = hashedPassword;
    await user.save();
  }
}
