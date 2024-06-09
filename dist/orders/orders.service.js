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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let OrdersService = class OrdersService {
    constructor(ordersModel) {
        this.ordersModel = ordersModel;
    }
    async createOrder(body, req) {
        try {
            if (req.currentUser) {
                const user = req.currentUser;
                const date = new Date();
                date.setHours(date.getHours() + 2);
                const order = new this.ordersModel(Object.assign(Object.assign({ user }, body), { date }));
                await order.save();
                return order;
            }
            else {
                const order = new this.ordersModel(body);
                await order.save();
                return order;
            }
        }
        catch (error) {
            console.error('Błąd podczas zapisywania zamówienia:', error);
            return {
                success: false,
                error: 'Wystąpił błąd podczas zapisywania zamówienia.',
            };
        }
    }
    async getUserOrders(req, page) {
        const pageSize = 10;
        const user = req.currentUser;
        const allOrder = await this.ordersModel
            .find({ 'user._id': user._id })
            .sort({ date: -1 });
        const orders = await this.ordersModel
            .find({ 'user._id': user._id })
            .sort({ date: -1 })
            .skip((parseInt(page) - 1) * pageSize)
            .limit(pageSize)
            .exec();
        const totalPages = Math.ceil((allOrder.length + 1) / pageSize);
        return { orders, totalPages };
    }
    async getOrder(id) {
        const order = await this.ordersModel.findById(id);
        if (!order) {
            return {
                success: false,
                error: 'Nie odnaleziono zamówienia o podanym numerze.',
            };
        }
        else {
            return order;
        }
    }
};
OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Orders')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], OrdersService);
exports.OrdersService = OrdersService;
//# sourceMappingURL=orders.service.js.map