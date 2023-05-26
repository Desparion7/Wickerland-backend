import { Controller } from '@nestjs/common';
import { Post, Body, Res, HttpStatus } from '@nestjs/common';
import { MessagesService } from './messages.service';
import { Response } from 'express';
import { MessageDto } from './dto/message.dto';

@Controller('messages')
export class MessagesController {
  constructor(private messagesService: MessagesService) {}

  @Post('/')
  async sendMessage(@Body() body: MessageDto, @Res() res: Response) {
    await this.messagesService.sendMsg(body);
    res.status(HttpStatus.OK).json({
      message: `Wiadomość została wysłana poprawnie`,
    });
  }
}
