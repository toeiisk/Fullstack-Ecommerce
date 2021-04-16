import mongoose from "mongoose";
import { composeWithMongoose } from "graphql-compose-mongoose";

const { Schema } = mongoose;

const PromotionSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    discount: { type: Number, required: true, default: 0 },
    productId: { type: String, required: true, index: true, ref: 'Product' },
    startDate: { type: Date, default: Date.now(), required: true },
    endDate: { type: Date, required: true },
}, { timestamps: { createdAt: 'createdAt' } });

export const PromotionModel = mongoose.model("Promotion", PromotionSchema);

export const PromotionTC = composeWithMongoose(PromotionModel, { removeFields: ["createdAt", "updatedAt"] });

export default PromotionModel;
