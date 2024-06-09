"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const saltRounds = 10;
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async signup(email, password) {
        const userExists = await this.userModel.findOne({ email }).exec();
        if (userExists) {
            throw new common_1.ConflictException('Użytkownik o podanym adresie e-mail już istnieje');
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = new this.userModel({ email, password: hashedPassword });
        const result = await newUser.save();
        return result;
    }
    async signin(email, password) {
        const [user] = await this.userModel.find({ email });
        if (!user) {
            throw new common_1.NotFoundException('Nieprawidłowy email lub hasło');
        }
        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            throw new common_1.BadRequestException('Nieprawidłowy email lub hasło');
        }
        const accessToken = jwt.sign({
            UserInfo: {
                id: user._id,
                email: user.email,
            },
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
        const refreshToken = jwt.sign({
            email: user.email,
        }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: '7d' });
        const cart = user.cart;
        const wishlist = user.wishlist;
        return { accessToken, refreshToken, cart, wishlist };
    }
    async logout(res) {
        const cookies = res.req.cookies;
        if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt))
            return res.sendStatus(204);
        res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
        return res.json({ message: 'Cookie wyczyszczone' });
    }
    async refresh(refreshToken) {
        try {
            const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
            const user = await this.userModel.findOne({ email: decoded.email });
            if (!user) {
                throw new common_1.UnauthorizedException('Brak autoryzacji');
            }
            const accessToken = jwt.sign({
                UserInfo: {
                    id: user._id,
                    email: user.email,
                },
            }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' });
            return accessToken;
        }
        catch (error) {
            throw new common_1.UnauthorizedException('Dostęp zabroniony');
        }
    }
    async getAddress(req) {
        const user = await this.userModel.findById(req.currentUser._id);
        const address = user.address;
        return address;
    }
    async updateAddress(body, req) {
        const user = await this.userModel.findById(req.currentUser._id);
        const address = {
            name: body.name,
            surname: body.surname,
            companyName: body.company,
            street: body.street,
            postcode: body.postcode,
            city: body.city,
            phone: body.phone,
        };
        user.address = address;
        await user.save();
        return user;
    }
    async updateCart(body, req) {
        const user = await this.userModel.findById(req.currentUser._id);
        const cart = body.cart;
        user.cart = cart;
        await user.save();
        return cart;
    }
    async updateWishList(body, req) {
        const user = await this.userModel.findById(req.currentUser._id);
        const wishlist = body.wishlist;
        user.wishlist = wishlist;
        await user.save();
        return wishlist;
    }
    async sendResetPasswordEmail(email) {
        const user = await this.userModel.findOne({ email }).exec();
        if (!user) {
            throw new common_1.HttpException('Brak użytkownika o podanym adresie e-mail', common_1.HttpStatus.NOT_FOUND);
        }
        const token = jwt.sign({ id: user._id.toString() }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: '15min',
        });
        const link = `https://wik-land-front.vercel.app/nowehasło/#access_token=${token}`;
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            secure: false,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.EMAIL_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            },
        });
        const mailOptions = {
            from: process.env.EMAIL,
            to: email,
            subject: 'Reset hasła w sklepie Wickerland',
            text: 'Witaj! Otrzymałeś ten e-mail, ponieważ złożyłeś prośbę o zresetowanie hasła. Kliknij na poniższy link, aby przejść do strony resetowania hasła. Ważność linku wygaśnie po 15 minutach. ' +
                link,
        };
        try {
            await transporter.sendMail(mailOptions);
        }
        catch (error) {
            throw new common_1.InternalServerErrorException('Wystąpił problem podczas wysyłania emaila resetującego hasło');
        }
    }
    async setNewPassword(body) {
        const token = body.token;
        const password = body.password;
        let userID;
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                throw new common_1.UnauthorizedException('Token jest niepoprawny lub stracił ważność');
            }
            else {
                userID = decoded.id;
            }
        });
        const user = await this.userModel.findOne({ _id: userID }).exec();
        if (!user) {
            throw new common_1.HttpException('Brak użytkownika o podanym adresie e-mail', common_1.HttpStatus.NOT_FOUND);
        }
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        user.password = hashedPassword;
        await user.save();
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Users')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map