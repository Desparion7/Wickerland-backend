import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  Res,
  Req,
  UseInterceptors,
  UnauthorizedException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';
import { Response, Request } from 'express';
import { CartDto } from './dto/cart.dto';
import { WishlistDto } from './dto/wishlist.dto';
import { AddressDto } from './dto/address.dto';
import { CustomRequest } from 'src/orders/orders.controller';

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
    const { accessToken, refreshToken, cart, wishlist } =
      await this.usersService.signin(email, password);
    // create scure cookie with refresh token
    response.cookie('jwt', refreshToken, {
      httpOnly: true, // accessible only by web server
      secure: true, //https
      sameSite: 'none', //corss-site cookie
      maxAge: 7 * 24 * 60 * 60 * 100, // cookie expiry: set to match rT
    });

    return response.json({ accessToken, cart, wishlist });
  }
  @Post('/logout')
  logout(@Res() res: Response) {
    return this.usersService.logout(res);
  }
  @Get('/refresh')
  async refresh(@Req() req: Request, @Res() res: Response) {
    const cookies = req.cookies;
    if (!cookies?.jwt) {
      throw new UnauthorizedException('Brak autoryzacji');
    }
    const refreshToken = cookies.jwt;

    const accessToken = await this.usersService.refresh(refreshToken);

    res.json({ accessToken });
  }
  @Get('/address')
  async getAddress(@Req() req: CustomRequest) {
    const address = await this.usersService.getAddress(req);
    return address;
  }
  @Patch('/address')
  async updateAddress(@Body() body: AddressDto, @Req() req: CustomRequest) {
    const address = await this.usersService.updateAddress(body, req);
    return address;
  }
  @Patch('/cart')
  async updateCart(@Body() body: CartDto, @Req() req: CustomRequest) {
    const cart = await this.usersService.updateCart(body, req);
    return cart;
  }
  @Patch('/wishlist')
  async updateWishList(@Body() body: WishlistDto, @Req() req: CustomRequest) {
    const wishlist = await this.usersService.updateWishList(body, req);
    return wishlist;
  }
  @Post('/reset')
  async forgotPassword(@Body() body: { email: string }, @Res() res: Response) {
    await this.usersService.sendResetPasswordEmail(body.email);
    res.status(HttpStatus.OK).json({
      message: `Email resetujący hasło został wysłany na adres ${body.email}.`,
    });
  }
  @Patch('/reset')
  async newPassword(
    @Body() body: { token: string; password: string },
    @Res() res: Response,
  ) {
    await this.usersService.setNewPassword(body);
    res.status(HttpStatus.OK).json({
      message: `Hasło zostało zmienione.`,
    });
  }
}
