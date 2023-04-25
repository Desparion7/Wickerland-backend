import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './interface/order.interface';
import { CreateOrderDto } from './dto/create-order.dto';

@Injectable()
export class OrdersService {
  constructor(@InjectModel('Orders') private ordersModel: Model<Order>) {}

  async createOrder(body: CreateOrderDto) {
    const order = new this.ordersModel(body);
    try {
      await order.save();
      return order;
    } catch (error) {
      console.error('Błąd podczas zapisywania zamówienia:', error);
      return {
        success: false,
        error: 'Wystąpił błąd podczas zapisywania zamówienia.',
      };
    }
  }
  async getOrder(id: string) {
    const order = await this.ordersModel.findById(id);
    if (!order) {
      return {
        success: false,
        error: 'Nie odnaleziono zamówienia o podanym numerze.',
      };
    } else {
      return order;
    }
  }
}
