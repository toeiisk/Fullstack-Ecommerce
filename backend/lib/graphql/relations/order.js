"use strict";

var _graphqlCompose = require("graphql-compose");

var _models = require("../../models");

_models.OrderTC.addRelation('user', {
  resolver: () => _models.UserTC.getResolver("findById"),
  prepareArgs: {
    _id: source => source.userId
  },
  projection: {
    userId: true
  }
});

const productItemTC = _graphqlCompose.schemaComposer.createInputTC(`
    input ProductItemTC {
        productId: ID
        amount: Int
        price: Float
        promotionId: ID
    }
`);

const productItemResolver = _graphqlCompose.schemaComposer.createResolver({
  name: "product",
  type: [_models.ProductTC],
  args: {
    productItem: [productItemTC]
  },
  resolve: ({
    source,
    args,
    context,
    info
  }) => {
    const {
      productItem
    } = args;
    const productItemId = [];
    productItem.forEach(product => {
      productItemId.push(product.productId);
    });
    return _models.ProductModel.find({
      _id: {
        $in: productItemId
      }
    });
  }
}); // OrderTC.addRelation(
//     'productItem',
//     {
//         resolver: () => productItemResolver,
//         prepareArgs: {
//             productItem: (source) => source.productItem
//         },
//         projection: { productItem: true }
//     }
// )


const productPromotionResolver = _graphqlCompose.schemaComposer.createResolver({
  name: "product",
  type: [_models.PromotionTC],
  args: {
    productItem: [productItemTC]
  },
  resolve: ({
    source,
    args,
    context,
    info
  }) => {
    const {
      productItem
    } = args;
    const promotionItemId = [];
    productItem.forEach(product => {
      promotionItemId.push(product.promotionId);
    });
    return _models.PromotionModel.find({
      _id: {
        $in: promotionItemId
      }
    });
  }
});

_models.OrderTC.addRelation('productPromotion', {
  resolver: () => productPromotionResolver,
  prepareArgs: {
    productItem: source => source.productItem
  },
  projection: {
    productItem: true
  }
});