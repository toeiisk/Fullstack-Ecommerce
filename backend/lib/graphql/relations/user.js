"use strict";

var _graphqlCompose = require("graphql-compose");

var _models = require("../../models");

const cartItemTC = _graphqlCompose.schemaComposer.createInputTC(`
    input CartItemTC {
        productId: ID
        amount: Int
    }
`);

const productItemResolver = _graphqlCompose.schemaComposer.createResolver({
  name: "product",
  type: [_models.ProductTC],
  args: {
    cartItem: [cartItemTC]
  },
  resolve: ({
    source,
    args,
    context,
    info
  }) => {
    const {
      cartItem
    } = args;
    const cartItemProductId = [];
    cartItem.forEach(product => {
      cartItemProductId.push(product.productId);
    });
    return _models.ProductModel.find({
      _id: {
        $in: cartItemProductId
      }
    });
  }
});

_models.UserTC.addRelation("cartItemProduct", {
  resolver: () => productItemResolver,
  prepareArgs: {
    cartItem: source => source.cartItem
  },
  projection: {
    cartItem: true
  }
});