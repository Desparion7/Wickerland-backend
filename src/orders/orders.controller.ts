import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private orderService: OrdersService) {}

  @Post()
  createNewOrder(@Body() body: CreateOrderDto) {
    return this.orderService.createOrder(body);
  }
  @Get('/:id')
  getSingleOrder(@Param('id') id: string) {
    return this.orderService.getOrder(id);
  }
}
