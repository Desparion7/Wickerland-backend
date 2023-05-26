import * as mongoose from 'mongoose';

export const MessageSchema = new mongoose.Schema({
  email: { type: String, require: true },
  name: { type: String, require: true },
  surname: { type: String, require: true },
  phone: { type: String, require: true },
  message: { type: String, require: true },
});
