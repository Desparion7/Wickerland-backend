import { Module, NestModule } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './models/user.model';
import { MiddlewareConsumer } from '@nestjs/common';
import { UserIdMiddleware } from 'src/middlewares/userid-middleware';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Users', schema: UserSchema }])],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(UserIdMiddleware).forRoutes('users/cart', 'users/wishlist');
  }
}
