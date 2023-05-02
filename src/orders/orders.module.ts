import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './models/order.model';
import { UserIdMiddleware } from 'src/middlewares/userid-middleware';
import { UserSchema } from 'src/users/models/user.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Orders', schema: OrderSchema }]),
    MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserIdMiddleware).forRoutes('*');
  }
}
