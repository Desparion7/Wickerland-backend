import * as mongoose from 'mongoose';

const Product = {
  pid: String,
  name: String,
  amount: Number,
  category: String,
  qty: Number,
  price: Number,
  img: [String],
};

export const UserSchema = new mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
  cart: { type: Array, default: [Product] },
  wishlist: { type: Array, default: [Product] },
});
