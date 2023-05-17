import { Controller, Post, Get, Body, Param, Req } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { User } from 'src/users/interface/user.interface';

export interface CustomRequest extends Request {
  currentUser?: User;
}

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Post()
  createNewOrder(@Body() body: CreateOrderDto, @Req() req: CustomRequest) {
    return this.orderService.createOrder(body, req);
  }
  @Get()
  getUserOrders(@Req() req: CustomRequest) {
    return this.orderService.getUserOrders(req);
  }
  @Get('/:id')
  getSingleOrder(@Param('id') id: string) {
    return this.orderService.getOrder(id);
  }
}
