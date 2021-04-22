import {
  ProductTC,
  ProductTypeTC,
  PromotionModel,
  PromotionTC,
} from "../../models";
import isEmpty from "is-empty";

ProductTC.addFields({
  discountedPrice: {
    type: "Float",
    resolve: async (source) => {
      const productPromotion = await PromotionModel.find({
        productId: source._id,
        startDate: { $lte: new Date() },
        endDate: { $gt: new Date() },
      });
      return isEmpty(productPromotion)
        ? source.price
        : source.price -
            source.price *
              (productPromotion
                .map((promotion) => promotion.discount)
                .reduce((total, percent) => total + percent) /
                100);
    },
    projection: { _id: true, price: true },
  },
  discountedPercent: {
    type: "Float",
    resolve: async (source) => {
      const productPromotion = await PromotionModel.find({
        productId: source._id,
        startDate: { $lte: new Date() },
        endDate: { $gt: new Date() },
      });
      return isEmpty(productPromotion)
        ? 0
        : productPromotion
            .map((promotion) => promotion.discount)
            .reduce((total, percent) => total + percent);
    },
    projection: { _id: true },
  },
  activePromotions: {
    type: [PromotionTC],
    resolve: (source) => {
      return PromotionModel.find({
        productId: source._id,
        startDate: { $lte: new Date() },
        endDate: { $gt: new Date() },
      });
    },
    projection: { _id: true },
  },
});

ProductTC.addRelation("promotions", {
  resolver: () => PromotionTC.getResolver("findMany"),
  prepareArgs: {
    filter: (source) => ({ productId: source._id }),
  },
  projection: { _id: true },
});

ProductTC.addRelation("productTypes", {
  resolver: () => ProductTypeTC.getResolver("findMany"),
  prepareArgs: {
    filter: (source) => ({ _id: { $in: source.productType } }),
  },
  projection: { productType: true },
});
