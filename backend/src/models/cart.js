import mongoose from "mongoose";
import { composeWithMongoose } from "graphql-compose-mongoose";

const { Schema } = mongoose;

const PruductItemSchema = new Schema({
    productId: { type: String, required: true, index: true, ref: 'Product' },
    amount: { type: Number, required: true, default: 1 }
})

const CartSchema = new Schema({
    userId: { type: String, required: true, index: true, ref: 'User' },
    productItem: [PruductItemSchema]
}, { timestamps: { createdAt: 'createdAt' } });

export const CartModel = mongoose.model("Cart", CartSchema);

export const CartTC = composeWithMongoose(CartModel, { removeFields: ["createdAt", "updatedAt"] });

export default CartModel;
