import * as mongoose from 'mongoose';

export const ProductsSchema = new mongoose.Schema({
  pid: { type: String, require: true },
  name: { type: String, require: true },
  description: { type: String, require: true },
  category: { type: String, require: true },
  subcategory: { type: String, require: true },
  amount: { type: Number, require: true },
  price: { type: Number, require: true },
  parameters: {
    type: [mongoose.Schema.Types.Mixed],
    required: true,
  },
  img: {
    type: [String],
    required: true,
  },
});
