"use strict";

var _models = require("../../models");

var _isEmpty = _interopRequireDefault(require("is-empty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_models.ProductTC.addFields({
  discountedPrice: {
    type: "Float",
    resolve: async source => {
      const productPromotion = await _models.PromotionModel.find({
        productId: source._id,
        startDate: {
          $lte: new Date(new Date().setUTCHours(new Date().getUTCHours() + 7)).toISOString()
        },
        endDate: {
          $gt: new Date(new Date().setUTCHours(new Date().getUTCHours() + 7)).toISOString()
        }
      });
      return (0, _isEmpty.default)(productPromotion) ? source.price : source.price - source.price * (productPromotion.map(promotion => promotion.discount).reduce((total, percent) => total + percent) / 100);
    },
    projection: {
      _id: true,
      price: true
    }
  },
  discountedPercent: {
    type: "Float",
    resolve: async source => {
      const productPromotion = await _models.PromotionModel.find({
        productId: source._id,
        startDate: {
          $lte: new Date(new Date().setUTCHours(new Date().getUTCHours() + 7)).toISOString()
        },
        endDate: {
          $gt: new Date(new Date().setUTCHours(new Date().getUTCHours() + 7)).toISOString()
        }
      });
      return (0, _isEmpty.default)(productPromotion) ? 0 : productPromotion.map(promotion => promotion.discount).reduce((total, percent) => total + percent);
    },
    projection: {
      _id: true
    }
  },
  activePromotions: {
    type: [_models.PromotionTC],
    resolve: source => {
      return _models.PromotionModel.find({
        productId: source._id,
        startDate: {
          $lte: new Date(new Date().setUTCHours(new Date().getUTCHours() + 7)).toISOString()
        },
        endDate: {
          $gt: new Date(new Date().setUTCHours(new Date().getUTCHours() + 7)).toISOString()
        }
      });
    },
    projection: {
      _id: true
    }
  },
  totalEarning: {
    type: "Float",
    resolve: async source => {
      const totalOrders = await _models.OrderModel.find({
        status: "COMPLETE",
        productItem: {
          $elemMatch: {
            productId: source._id
          }
        }
      });

      if ((0, _isEmpty.default)(totalOrders)) {
        return 0;
      }

      const totalEarning = totalOrders.map(order => order.productItem).map(pdItem => pdItem.filter(pd => pd.productId === source._id.toString())).map(pd => pd[0].discountedPrice * pd[0].amount).reduce((total, earn) => total + earn, 0);
      return totalEarning;
    },
    projection: {
      _id: true
    }
  }
});

_models.ProductTC.addRelation("promotions", {
  resolver: () => _models.PromotionTC.getResolver("findMany"),
  prepareArgs: {
    filter: source => ({
      productId: source._id
    })
  },
  projection: {
    _id: true
  }
}); // ProductTC.addRelation("productTypes", {
//   resolver: () => ProductTypeTC.getResolver("findMany"),
//   prepareArgs: {
//     filter: (source) => ({ _id: { $in: source.productType } }),
//   },
//   projection: { productType: true },
// });