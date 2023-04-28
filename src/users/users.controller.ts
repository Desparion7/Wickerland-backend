import { Controller, Post, Body, Res, UseInterceptors } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';
import { Response } from 'express';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @UseInterceptors(SerializeInterceptor)
  @Post('/signup')
  async createUser(@Body() body: CreateUserDto) {
    const user = await this.usersService.signup(body.email, body.password);
    return user;
  }
  @Post('/login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res() response: Response,
  ) {
    const { accessToken, refreshToken } = await this.usersService.signin(
      email,
      password,
    );
    // create scure cookie with refresh token
    response.cookie('jwt', refreshToken, {
      httpOnly: true, // accessible only by web server
      secure: true, //https
      sameSite: 'none', //corss-site cookie
      maxAge: 7 * 24 * 60 * 60 * 100, // cookie expiry: set to match rT
    });

    return response.json({ accessToken });
  }
}
