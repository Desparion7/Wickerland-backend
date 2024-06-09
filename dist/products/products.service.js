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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
let ProductsService = class ProductsService {
    constructor(productModel) {
        this.productModel = productModel;
    }
    async getProducts({ pageNumber = 1, pageSize = 9, min, max, category, subcategory, search, sort, }) {
        let query = this.productModel.find();
        if (category !== 'undefined') {
            query = query.where('category').in([category]);
        }
        if (subcategory !== 'undefined') {
            query = query.where('subcategory').in([subcategory]);
        }
        if (!isNaN(min) && !isNaN(max)) {
            query = query.where('price').gte(min).lte(max);
        }
        if (search !== 'undefined') {
            query = query.where('name', new RegExp(search, 'i'));
        }
        if (sort === 'fromMax') {
            query = query.sort({ price: -1 });
        }
        else if (sort === 'fromMin') {
            query = query.sort({ price: 1 });
        }
        const products = await query
            .skip((pageNumber - 1) * pageSize)
            .limit(pageSize)
            .exec();
        const count = await this.productModel.countDocuments(query.getQuery());
        const totalPages = Math.ceil(count / pageSize);
        return { products, totalPages };
    }
    async getProductByPid(pid) {
        const product = await this.productModel.findOne({ pid }).exec();
        if (!product) {
            throw new common_1.NotFoundException('nie znaleziono produktu o podanym id');
        }
        return { product };
    }
};
ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)('Product')),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductsService);
exports.ProductsService = ProductsService;
//# sourceMappingURL=products.service.js.map