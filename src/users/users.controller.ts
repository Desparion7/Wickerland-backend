import { Controller, Post, Body, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseInterceptors(SerializeInterceptor)
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.usersService.signup(body.email, body.password);
    return user;
  }
}
