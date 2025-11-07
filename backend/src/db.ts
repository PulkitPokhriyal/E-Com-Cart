import mongoose, { Schema, Types } from "mongoose";
import env from "dotenv";

env.config();
mongoose.connect(process.env.MONGODB_STRING!);

const userSchema = new Schema({
  email: { type: String, unique: true },
  hashpassword: String,
  username: { type: String, unique: true },
});

const cartItemSchema = new Schema({
  userId: { type: Types.ObjectId, ref: "User", required: true },
  productId: { type: Number, required: true },
  title: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String },
  qty: { type: Number, default: 1 },
  rate: { type: Number, required: true },
  count: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const userModel = mongoose.model("User", userSchema);
const cartItemModel = mongoose.model("CartItem", cartItemSchema);

export { userModel, cartItemModel };
