import { Injectable, ConflictException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './interface/user.interface';
import * as bcrypt from 'bcrypt';

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
}
