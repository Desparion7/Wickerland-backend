"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderSchema = void 0;
const mongoose = require("mongoose");
const User = {
    _id: mongoose.Schema.Types.ObjectId,
    email: String,
};
const Product = {
    pid: String,
    name: String,
    amount: Number,
    category: String,
    qty: Number,
    price: Number,
    img: [String],
};
exports.OrderSchema = new mongoose.Schema({
    user: {
        type: User,
        required: false,
    },
    name: { type: String, require: true },
    surname: { type: String, require: true },
    companyName: { type: String, require: false },
    street: { type: String, require: true },
    postcode: { type: String, require: true },
    city: { type: String, require: true },
    phone: { type: String, require: true },
    email: { type: String, required: true },
    message: { type: String, required: false },
    paymentMethod: { type: String, required: true },
    deliveryMethod: { type: String, required: true },
    price: { type: Number, require: true },
    date: { type: Date, require: true },
    products: {
        type: [Product],
        required: true,
    },
    paid: { type: Boolean, default: false },
});
//# sourceMappingURL=order.model.js.map