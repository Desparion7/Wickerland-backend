import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { MessageDto } from './dto/message.dto';
import * as nodemailer from 'nodemailer';
import { InternalServerErrorException } from '@nestjs/common';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel('Message') private messageModel: Model<MessageDto>,
  ) {}

  async sendMsg(body: MessageDto) {
    const message = new this.messageModel(body);
    await message.save();

    // send email
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
      to: 'wosmateusz2@gmail.com',
      subject: `Wiadomość od ${body.email}`,
      html: `<h2>Wiadomość od ${body.name} ${body.surname}</h2><p>${body.message}</p> <p>Telefon:${body.phone}</p>`,
    };

    try {
      await transporter.sendMail(mailOptions);
    } catch (error) {
      throw new InternalServerErrorException(
        'Wystąpił problem podczas wysyłania emaila',
      );
    }
    return message;
  }
}
