import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './interface/order.interface';
import { CreateOrderDto } from './dto/create-order.dto';
import { CustomRequest } from './orders.controller';

@Injectable()
export class OrdersService {
  constructor(@InjectModel('Orders') private ordersModel: Model<Order>) {}

  async createOrder(body: CreateOrderDto, req: CustomRequest) {
    try {
      if (req.currentUser) {
        const user = req.currentUser;
        const date = new Date();
        date.setHours(date.getHours() + 2);
        const order = new this.ordersModel({ user, ...body, date });
        await order.save();
        return order;
      } else {
        const order = new this.ordersModel(body);
        await order.save();
        return order;
      }
    } catch (error) {
      console.error('Błąd podczas zapisywania zamówienia:', error);
      return {
        success: false,
        error: 'Wystąpił błąd podczas zapisywania zamówienia.',
      };
    }
  }
  async getUserOrders(req: CustomRequest, page: string) {
    const pageSize = 10;
    const user = req.currentUser;
    // all user order
    const allOrder = await this.ordersModel
      .find({ 'user._id': user._id })
      .sort({ date: -1 });
    // only order for current page
    const orders = await this.ordersModel
      .find({ 'user._id': user._id })
      .sort({ date: -1 })
      .skip((parseInt(page) - 1) * pageSize)
      .limit(pageSize)
      .exec();

    const totalPages = Math.ceil((allOrder.length + 1) / pageSize);
    return { orders, totalPages };
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
