import { schemaComposer } from "graphql-compose";
import { PromotionModel, PromotionTC } from "../../models";

export const promotionById = PromotionTC.getResolver("findById");
export const allPromotion = PromotionTC.getResolver("findMany");

export const activePromotions = schemaComposer.createResolver({
  name: "activePromotions",
  type: [PromotionTC],
  resolve: () => {
    return PromotionModel.find({
      startDate: {
        $lte: new Date(
          new Date().setUTCHours(new Date().getUTCHours() + 7)
        ).toISOString(),
      },
      endDate: {
        $gt: new Date(
          new Date().setUTCHours(new Date().getUTCHours() + 7)
        ).toISOString(),
      },
    });
  },
});
