import {
  Controller,
  Post,
  Get,
  Body,
  Res,
  Req,
  UseInterceptors,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { SerializeInterceptor } from '../interceptors/serialize.interceptor';
import { Response, Request } from 'express';

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
}
