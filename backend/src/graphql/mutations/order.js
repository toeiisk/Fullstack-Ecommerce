import { schemaComposer } from "graphql-compose";
import {
  OrderModel,
  OrderTC,
  ProductModel,
  ProductTC,
  PromotionModel,
  UserModel,
} from "../../models";
import { authMiddleware } from "../middleware";
import isEmpty from "is-empty";
import { UserInputError } from "apollo-server-express";

export const updateOrderById = OrderTC.getResolver("updateById", [
  authMiddleware(true),
]);

const productItemTC = schemaComposer.createInputTC(`
    input ProductItemTC {
        productId: ID
        amount: Int
    }
`);

export const createOrder = schemaComposer
  .createResolver({
    name: "createOrder",
    args: {
      productItem: [productItemTC],
      paymentMethod: "String!",
    },
    type: OrderTC.getType(),
    resolve: async ({ args, context }) => {
      if (!context.user) {
        return null;
      }
      const { _id } = context.user;
      const { productItem, paymentMethod } = args;
      const user = await UserModel.findById(_id);
      const Products = await ProductModel.find({
        _id: { $in: productItem.map((item) => item.productId) },
      });
      const productsPromotions = await PromotionModel.find({
        productId: { $in: productItem.map((item) => item.productId) },
        startDate: { $lte: new Date() },
        endDate: { $gt: new Date() },
      });
      Products.forEach((product) => (product.activePromotions = []));
      productsPromotions.forEach((promo) => {
        const productIndex = productItem
          .map((item) => item.productId)
          .indexOf(promo.productId);
        if (productIndex !== -1) {
          Products[productIndex].activePromotions.push(promo);
        }
      });
      productItem.forEach((item, index) => {
        if (Products[index].amount < item.amount) {
          throw new UserInputError("current stocks are not enough");
        }
        const productPromotions = isEmpty(Products[index].activePromotions)
          ? []
          : Products[index].activePromotions;
        item.name = Products[index].name;
        item.description = Products[index].description;
        item.price = Products[index].price;
        item.discountedPrice = isEmpty(productPromotions)
          ? Products[index].price
          : Products[index].price -
            Products[index].price *
              (productPromotions
                .map((promotion) => promotion.discount)
                .reduce((total, percent) => total + percent) /
                100);
        item.discountedPercent = isEmpty(productPromotions)
          ? 0
          : productPromotions
              .map((promotion) => promotion.discount)
              .reduce((total, percent) => total + percent);
        item.image = Products[index].image;
        item.activePromotions = productPromotions;
      });
      const newOrder = new OrderModel({
        userId: user?._id || _id,
        productItem,
        paymentMethod,
      });
      await newOrder.save().then(() => {
        productItem.forEach(async (pd) => {
          const originProduct = await ProductModel.findById(pd.productId);
          originProduct.amount -= pd.amount;
          originProduct.save();
        });
      });
      return newOrder;
    },
  })
  .withMiddlewares([authMiddleware(false)]);

export const updateOrderStatusById = schemaComposer
  .createResolver({
    name: "updateOrderStatusById",
    args: {
      orderId: "ID!",
      orderStatus: "String!",
    },
    type: OrderTC.getType(),
    resolve: async ({ args, context }) => {
      if (!context.user) {
        return null;
      }
      const { orderId, orderStatus } = args;
      const order = await OrderModel.findById(orderId);
      if (
        orderStatus !== "COMPLETE" &&
        orderStatus !== "WAIT" &&
        orderStatus !== "CANCEL"
      )
        throw new UserInputError("wrong order status");
      if (orderStatus === "CANCEL") {
        const Products = await ProductModel.find({
          _id: { $in: order.productItem.map((item) => item.productId) },
        });
        Products.forEach(async (pd, index) => {
          pd.amount += order.productItem[index].amount;
          await pd.save();
        });
      }
      order.status = orderStatus;
      order.save();
      return order;
    },
  })
  .withMiddlewares([authMiddleware(true)]);
