import * as mongoose from 'mongoose';

const Address = {
  name: String,
  surname: String,
  companyName: String,
  street: String,
  postcode: String,
  city: String,
  phone: String,
};

export const UserSchema = new mongoose.Schema({
  email: { type: String, require: true },
  password: { type: String, require: true },
  cart: { type: Array, default: [] },
  wishlist: { type: Array, default: [] },
  address: { type: Address, default: {} },
});
