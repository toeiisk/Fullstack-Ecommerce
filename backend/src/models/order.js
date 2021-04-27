import mongoose from "mongoose";
import { composeWithMongoose } from "graphql-compose-mongoose";
import { ObjectTypeComposer } from "graphql-compose";

const { Schema } = mongoose;

const ProductPromotionSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  discount: { type: Number, required: true, default: 0 },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
});

const ProductItemSchema = new Schema({
  productId: { type: String, required: true, index: true, ref: "Product" },
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  discountedPrice: { type: Number, required: true },
  discountedPercent: { type: Number, required: true },
  amount: { type: Number, required: true },
  image: { type: String },
  activePromotions: [ProductPromotionSchema],
});

const enumOrderType = {
  WAIT: "Waiting",
  COMPLETE: "Complete",
};

const OrderSchema = new Schema(
  {
    userId: { type: String, required: true, index: true, ref: "User" },
    productItem: [ProductItemSchema],
    paymentMethod: { type: String },
    status: {
      type: String,
      default: "WAIT",
      enum: Object.keys(enumOrderType),
      index: true,
    },
  },
  { timestamps: { createdAt: "purchaseDate" } }
);

export const OrderModel = mongoose.model("Order", OrderSchema);

export const OrderTC = composeWithMongoose(OrderModel, {
  removeFields: ["purchaseDate", "updatedAt"],
});

export default OrderModel;
