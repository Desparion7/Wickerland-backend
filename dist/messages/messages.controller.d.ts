import { MessagesService } from './messages.service';
import { Response } from 'express';
import { MessageDto } from './dto/message.dto';
export declare class MessagesController {
    private messagesService;
    constructor(messagesService: MessagesService);
    sendMessage(body: MessageDto, res: Response): Promise<void>;
}
