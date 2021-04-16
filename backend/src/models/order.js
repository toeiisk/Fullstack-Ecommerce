import mongoose from "mongoose";
import { composeWithMongoose } from "graphql-compose-mongoose";

const { Schema } = mongoose;

const PruductItemSchema = new Schema({
    productId: { type: String, required: true, index: true, ref: 'Product' },
    amount: { type: Number, required: true, default: 1 },
    price: { type: Number, required: true },
    promotionId: { type: String, required: true, index: true, ref: 'Promotion' },
})

const OrderSchema = new Schema({
    userId: { type: String, required: true, index: true, ref: 'User' },
    productItem: [PruductItemSchema],
    paymentMethod: { type: String }
}, { timestamps: { createdAt: 'purchaseDate' } });

export const OrderModel = mongoose.model("Order", OrderSchema);

export const OrderTC = composeWithMongoose(OrderModel, { removeFields: ["purchaseDate", "updatedAt"] });

export default OrderModel;
