import { ProductTypeTC } from "../../models"
import { authMiddleware } from "../middleware";

export const createProductType = ProductTypeTC.getResolver("createOne", [authMiddleware(true)]);
export const updateProductTypeById = ProductTypeTC.getResolver("updateById", [authMiddleware(true)])