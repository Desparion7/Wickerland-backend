import {
  Injectable,
  ConflictException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interface/user.interface';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';

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
    // Send accessToken containing username
    return { accessToken, refreshToken };
  }
}
