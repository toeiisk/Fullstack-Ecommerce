"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateOrderStatusById = exports.createOrder = exports.updateOrderById = void 0;

var _graphqlCompose = require("graphql-compose");

var _models = require("../../models");

var _middleware = require("../middleware");

var _isEmpty = _interopRequireDefault(require("is-empty"));

var _apolloServerExpress = require("apollo-server-express");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const updateOrderById = _models.OrderTC.getResolver("updateById", [(0, _middleware.authMiddleware)(true)]);

exports.updateOrderById = updateOrderById;

const productItemTC = _graphqlCompose.schemaComposer.createInputTC(`
    input ProductItemTC {
        productId: ID
        amount: Int
    }
`);

const createOrder = _graphqlCompose.schemaComposer.createResolver({
  name: "createOrder",
  args: {
    productItem: [productItemTC],
    paymentMethod: "String!"
  },
  type: _models.OrderTC.getType(),
  resolve: async ({
    args,
    context
  }) => {
    if (!context.user) {
      return null;
    }

    const {
      _id
    } = context.user;
    const {
      productItem,
      paymentMethod
    } = args;
    const user = await _models.UserModel.findById(_id);
    const Products = await _models.ProductModel.find({
      _id: {
        $in: productItem.map(item => item.productId)
      }
    });
    const productsPromotions = await _models.PromotionModel.find({
      productId: {
        $in: productItem.map(item => item.productId)
      },
      startDate: {
        $lte: new Date()
      },
      endDate: {
        $gt: new Date()
      }
    });
    Products.forEach(product => product.activePromotions = []);
    productsPromotions.forEach(promo => {
      const productIndex = productItem.map(item => item.productId).indexOf(promo.productId);

      if (productIndex !== -1) {
        Products[productIndex].activePromotions.push(promo);
      }
    });
    productItem.forEach((item, index) => {
      if (Products[index].amount < item.amount) {
        throw new _apolloServerExpress.UserInputError("current stocks are not enough");
      }

      const productPromotions = (0, _isEmpty.default)(Products[index].activePromotions) ? [] : Products[index].activePromotions;
      item.name = Products[index].name;
      item.description = Products[index].description;
      item.price = Products[index].price;
      item.discountedPrice = (0, _isEmpty.default)(productPromotions) ? Products[index].price : Products[index].price - Products[index].price * (productPromotions.map(promotion => promotion.discount).reduce((total, percent) => total + percent) / 100);
      item.discountedPercent = (0, _isEmpty.default)(productPromotions) ? 0 : productPromotions.map(promotion => promotion.discount).reduce((total, percent) => total + percent);
      item.image = Products[index].image;
      item.activePromotions = productPromotions;
    });
    const newOrder = new _models.OrderModel({
      userId: (user === null || user === void 0 ? void 0 : user._id) || _id,
      productItem,
      paymentMethod
    });
    await newOrder.save().then(() => {
      productItem.forEach(async pd => {
        const originProduct = await _models.ProductModel.findById(pd.productId);
        originProduct.amount -= pd.amount;
        originProduct.save();
      });
    });
    return newOrder;
  }
}).withMiddlewares([(0, _middleware.authMiddleware)(false)]);

exports.createOrder = createOrder;

const updateOrderStatusById = _graphqlCompose.schemaComposer.createResolver({
  name: "updateOrderStatusById",
  args: {
    orderId: "ID!",
    orderStatus: "String!"
  },
  type: _models.OrderTC.getType(),
  resolve: async ({
    args,
    context
  }) => {
    if (!context.user) {
      return null;
    }

    const {
      orderId,
      orderStatus
    } = args;
    const order = await _models.OrderModel.findById(orderId);
    if (orderStatus !== "COMPLETE" && orderStatus !== "WAIT" && orderStatus !== "CANCEL") throw new _apolloServerExpress.UserInputError("wrong order status");

    if (orderStatus === "CANCEL") {
      const Products = await _models.ProductModel.find({
        _id: {
          $in: order.productItem.map(item => item.productId)
        }
      });
      Products.forEach(async (pd, index) => {
        pd.amount += order.productItem[index].amount;
        await pd.save();
      });
    }

    order.status = orderStatus;
    order.save();
    return order;
  }
}).withMiddlewares([(0, _middleware.authMiddleware)(true)]);

exports.updateOrderStatusById = updateOrderStatusById;