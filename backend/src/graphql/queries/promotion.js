import { PromotionTC } from "../../models";

export const promotionById = PromotionTC.getResolver("findById")
export const allPromotion = PromotionTC.getResolver("findMany")