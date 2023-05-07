import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
  cart: { type: Array, default: [] },
  wishlist: { type: Array, default: [] },
});
