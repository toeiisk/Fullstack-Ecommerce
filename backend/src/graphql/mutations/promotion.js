import { PromotionTC } from "../../models"
import { authMiddleware } from "../middleware";

export const createPromotion = PromotionTC.getResolver("createOne", [authMiddleware(true)]);
export const updatePromotionById = PromotionTC.getResolver("updateById", [authMiddleware(true)])