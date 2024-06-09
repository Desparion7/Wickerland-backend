"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const mongoose = require("mongoose");
const Address = {
    name: String,
    surname: String,
    companyName: String,
    street: String,
    postcode: String,
    city: String,
    phone: String,
};
exports.UserSchema = new mongoose.Schema({
    email: { type: String, require: true },
    password: { type: String, require: true },
    cart: { type: Array, default: [] },
    wishlist: { type: Array, default: [] },
    address: { type: Address, default: {} },
});
//# sourceMappingURL=user.model.js.map