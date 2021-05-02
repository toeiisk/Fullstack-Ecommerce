import mongoose from "mongoose";
import { composeWithMongoose } from "graphql-compose-mongoose";

const { Schema } = mongoose;

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true, default: 0 },
    amount: { type: Number, required: true, default: 0 },
    image: { type: String },
    productType: [{ type: String }],
  },
  { timestamps: { createdAt: "createdAt" } }
);

export const ProductModel = mongoose.model("Product", ProductSchema);

export const ProductTC = composeWithMongoose(ProductModel, {
  removeFields: ["createdAt", "updatedAt"],
});

export default ProductModel;
