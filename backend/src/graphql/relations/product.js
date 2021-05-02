import {
  OrderModel,
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
  totalEarning: {
    type: "Float",
    resolve: async (source) => {
      const totalOrders = await OrderModel.find({
        productItem: {
          $elemMatch: {
            productId: source._id,
          },
        },
      });
      if (isEmpty(totalOrders)) {
        return 0;
      }
      const totalEarning = totalOrders
        .map((order) => order.productItem)
        .map((pdItem) =>
          pdItem.filter((pd) => pd.productId === source._id.toString())
        )
        .map((pd) => pd[0].discountedPrice * pd[0].amount)
        .reduce((total, earn) => total + earn, 0);
      return totalEarning;
    },
    projection: { _id: true },
  },
  slug: {
    type: "String",
    resolve: (source) => {
      return source.name
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
    },
    projection: { name: true },
  },
});

ProductTC.addRelation("promotions", {
  resolver: () => PromotionTC.getResolver("findMany"),
  prepareArgs: {
    filter: (source) => ({ productId: source._id }),
  },
  projection: { _id: true },
});

// ProductTC.addRelation("productTypes", {
//   resolver: () => ProductTypeTC.getResolver("findMany"),
//   prepareArgs: {
//     filter: (source) => ({ _id: { $in: source.productType } }),
//   },
//   projection: { productType: true },
// });
