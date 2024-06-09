"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nestjs_seeder_1 = require("nestjs-seeder");
const mongoose_1 = require("@nestjs/mongoose");
const product_model_1 = require("./products/models/product.model");
const products_seed_1 = require("./products/seed/products.seed");
const config_1 = require("@nestjs/config");
(0, nestjs_seeder_1.seeder)({
    imports: [
        config_1.ConfigModule.forRoot(),
        mongoose_1.MongooseModule.forRoot(process.env.DATABASE_URL),
        mongoose_1.MongooseModule.forFeature([{ name: 'Products', schema: product_model_1.ProductsSchema }]),
    ],
}).run([products_seed_1.ProductsSeeder]);
//# sourceMappingURL=seeder.js.map