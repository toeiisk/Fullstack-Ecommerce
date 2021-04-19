import { ProductTC } from "../../models"
import { authMiddleware } from "../middleware";

export const createProduct = ProductTC.getResolver("createOne", [authMiddleware(true)]);
export const updateProductById = ProductTC.getResolver("updateById", [authMiddleware(true)])