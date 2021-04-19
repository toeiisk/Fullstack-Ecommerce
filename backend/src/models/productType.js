import mongoose from "mongoose";
import { composeWithMongoose } from "graphql-compose-mongoose";

const { Schema } = mongoose;

const ProductTypeSchema = new Schema({
    name: { type: String, required: true },
}, { timestamps: { createdAt: 'createdAt' } });

export const ProductTypeModel = mongoose.model("ProductType", ProductTypeSchema);

export const ProductTypeTC = composeWithMongoose(ProductTypeModel, { removeFields: ["createdAt", "updatedAt"] });

export default ProductTypeModel;
