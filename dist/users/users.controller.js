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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const serialize_interceptor_1 = require("../interceptors/serialize.interceptor");
const cart_dto_1 = require("./dto/cart.dto");
const wishlist_dto_1 = require("./dto/wishlist.dto");
const address_dto_1 = require("./dto/address.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async createUser(body) {
        const user = await this.usersService.signup(body.email, body.password);
        return user;
    }
    async login(email, password, response) {
        const { accessToken, refreshToken, cart, wishlist } = await this.usersService.signin(email, password);
        response.cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 100,
        });
        return response.json({ accessToken, cart, wishlist });
    }
    logout(res) {
        return this.usersService.logout(res);
    }
    async refresh(req, res) {
        const cookies = req.cookies;
        if (!(cookies === null || cookies === void 0 ? void 0 : cookies.jwt)) {
            res.status(common_1.HttpStatus.OK).json({
                message: `Brak tokena`,
            });
        }
        const refreshToken = cookies.jwt;
        const accessToken = await this.usersService.refresh(refreshToken);
        res.json({ accessToken });
    }
    async getAddress(req) {
        const address = await this.usersService.getAddress(req);
        return address;
    }
    async updateAddress(body, req) {
        const address = await this.usersService.updateAddress(body, req);
        return address;
    }
    async updateCart(body, req) {
        const cart = await this.usersService.updateCart(body, req);
        return cart;
    }
    async updateWishList(body, req) {
        const wishlist = await this.usersService.updateWishList(body, req);
        return wishlist;
    }
    async forgotPassword(body, res) {
        await this.usersService.sendResetPasswordEmail(body.email);
        res.status(common_1.HttpStatus.OK).json({
            message: `Email resetujący hasło został wysłany na adres ${body.email}.`,
        });
    }
    async newPassword(body, res) {
        await this.usersService.setNewPassword(body);
        res.status(common_1.HttpStatus.OK).json({
            message: `Hasło zostało zmienione.`,
        });
    }
};
__decorate([
    (0, common_1.UseInterceptors)(serialize_interceptor_1.SerializeInterceptor),
    (0, common_1.Post)('/signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "createUser", null);
__decorate([
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)('email')),
    __param(1, (0, common_1.Body)('password')),
    __param(2, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, common_1.Post)('/logout'),
    __param(0, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "logout", null);
__decorate([
    (0, common_1.Get)('/refresh'),
    __param(0, (0, common_1.Req)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "refresh", null);
__decorate([
    (0, common_1.Get)('/address'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getAddress", null);
__decorate([
    (0, common_1.Patch)('/address'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [address_dto_1.AddressDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateAddress", null);
__decorate([
    (0, common_1.Patch)('/cart'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [cart_dto_1.CartDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateCart", null);
__decorate([
    (0, common_1.Patch)('/wishlist'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [wishlist_dto_1.WishlistDto, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "updateWishList", null);
__decorate([
    (0, common_1.Post)('/reset'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "forgotPassword", null);
__decorate([
    (0, common_1.Patch)('/reset'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "newPassword", null);
UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
exports.UsersController = UsersController;
//# sourceMappingURL=users.controller.js.map